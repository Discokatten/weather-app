from pathlib import Path
import json

BASE_DIR = Path(__file__).parent.parent
DATA_DIR = BASE_DIR / 'data'
CLOTHES_FILE = DATA_DIR / 'clothes.json'

ENCODING = 'utf-8'

def get_clothes():
    with open(DATA_DIR / CLOTHES_FILE,'r', encoding=ENCODING) as file:
        data = json.load(file)
    return data
    print(f'Course: {data['course']}, week: {data['week']}')


# Save a dictionary to summary.json with json.dump.
# data = [{'course':'dans', 'score':'17'}, {'course':'bamsegympa','score':'145'}]
# with open(DATA_DIR / 'summary.json', 'w', encoding=ENCODING) as file:
#     json.dump(data, file)


# with open(DATA_DIR / 'summary.json' ,'r', encoding=ENCODING) as file:
#     data = json.load(file)
# for courses in data:
#     print(f'Added course: {courses['course']}')