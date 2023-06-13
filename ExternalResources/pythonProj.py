import sys
import os
import random
import sqlite3
import re

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
    print("Invalid given argument length. Given: " + sys.argv)
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

#### dev program here ####

# Populate the table with test data.
for _ in range(25):
    insert_data(database_name, table_name, subject, generate_random_string(), generate_random_string())