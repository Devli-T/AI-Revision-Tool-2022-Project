import sys
import os
import random
import sqlite3
import re
import openai

openai.api_key = ""

def generate_questions_answers(input):
    prompt = f"I want to revise the entirety of the following text, generate questions and specific answers in the following format Q1: \n A1: \n Q2: \n A2: ... \n\n\n\n{input}"
    response = openai.Completion.create(
        engine='text-davinci-002',
        prompt=prompt,
        temperature=0.7,
        max_tokens=1024,
        n=1,
        stop=None,
        timeout=20,
    )

    return response


rng = random.Random()

def has_invalid_characters(string):
    pattern = r'[^a-zA-Z0-9]'
    return re.findall(pattern, string)

def generate_random_string():
    words = ['apple', 'banana', 'cherry', 'date', 'elderberry', 'fig', 'grape', 'honeydew']
    return ' '.join(rng.choices(words, k=rng.randint(2, 5)))

def create_database(database_name):
    conn = sqlite3.connect(database_name)
    conn.close()

def check_table_exists(database, table_name):
    conn = sqlite3.connect(database)
    cursor = conn.cursor()
    cursor.execute("SELECT name FROM sqlite_master WHERE type='table' AND name=?", (table_name,))
    row = cursor.fetchone()
    conn.close()
    return row is not None

# unsafe
def create_table(database_name, table_name):
    conn = sqlite3.connect(database_name)
    cursor = conn.cursor()
    cursor.execute(f"CREATE TABLE IF NOT EXISTS {table_name} (id INTEGER PRIMARY KEY AUTOINCREMENT, subject TEXT, question TEXT, answer TEXT)")
    conn.commit()
    conn.close()

def insert_data(database_name, table_name, subject, question, answer):
    conn = sqlite3.connect(database_name)
    cursor = conn.cursor()
    cursor.execute(f"INSERT INTO {table_name} (subject, question, answer) VALUES (?, ?, ?)", (subject, question, answer))
    conn.commit()
    conn.close()

# Argv needs to be: [username] [subject] [file]
if len(sys.argv) != 4:
    print("Invalid given argument length. Given: " + str(len(sys.argv)))
    sys.exit(2)

database_name = 'flashcards.sqlite'
username = sys.argv[1]
subject = sys.argv[2]
file_name = sys.argv[3]
table_name = username

if (has_invalid_characters(username)):
    print("Username has invalid characters in it")
    sys.exit(4)

if (not file_name.endswith(".txt")) or (not os.path.exists(file_name)):
    print("Invalid file name to read from")
    sys.exit(3)  

if not os.path.exists(database_name):
    create_database(database_name)

if not check_table_exists(database_name, table_name):
    create_table(database_name, table_name)


with open(file_name, 'r') as file:
    inputData = file.read()
    response = generate_questions_answers(inputData)
    response_text = response['choices'][0]['text']
    split_Response = response_text.splitlines()
    split_Response.remove("")
    
    for i in range(len(split_Response)//2):
        print()
        print()
        insert_data(database_name, table_name, subject, split_Response[2 * i][4:], split_Response[(2 * i) + 1][4:])


#### dev program here ####

# Populate the table with test data.
for _ in range(25):
    insert_data(database_name, table_name, subject, generate_random_string(), generate_random_string())