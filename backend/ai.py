import os
from groq import Groq
from dotenv import load_dotenv

load_dotenv()

api_key = os.getenv("GROQ_API_KEY")
client = Groq(api_key=api_key)
```

Then open `.env` and make sure your key is there:
```
GROQ_API_KEY=your_actual_key_here