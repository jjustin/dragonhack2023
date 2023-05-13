import requests
import random

def get_tweet(temperature, prompt):

    temperature = float(1.0 - temperature/100)

    model = "gpt-4"
    token = "At6UbHxSFA2iygYCkQmhhvqQKmyReq"

    if temperature < 0.8:
        response = requests.post(
            "https://openai-api.meetings.bio/api/openai/chat/completions",
            headers={"Authorization": f"Bearer {token}"},
            json={
                # specification of all options: https://platform.openai.com/docs/api-reference/chat/create
                "model": model,
                "temperature": temperature, # float
                "messages": [
                    # {"role": "system", "content": "You are a Twitter post writter, who writtes tweets that protest on given topic. You write a tweet in the same language as the topic of protest is written in."},
                    {"role": "system", "content": "As a Twitter post writer, your job is to write tweets that express protest on a given topic. When writing these tweets, it is important to use the same language as the topic of protest is written in."},
                    {"role": "user", "content": "Davki kmetov"},
                    {"role": "assistant", "content": "Obdavčevanje naših pridnih kmetov je sramota! Slovenija se mora zavedati, da je naša kmetijska industrija hrbtenica našega gospodarstva. Nehajte kaznovati tiste, ki nam zagotavljajo hrano, in začnite jih podpirati! #StopDavkomNaKmete #SlovenskaKmetijstvo #PodpriteKmete"},
                    {"role": "user", "content": f"{prompt}"}
                ]
            },
        )
        if response.ok:
            print(response.json()["choices"][0]["message"]["content"])

        return response.json()["choices"][0]["message"]["content"]
    
    else:
        # fetch the list of templates
        response = requests.get('https://api.memegen.link/templates')
        templates = response.json()

        # get all names
        names = [template['name'] for template in templates]
        names_limited = random.sample(names, 20)

        response = requests.post(
            "https://openai-api.meetings.bio/api/openai/chat/completions",
            headers={"Authorization": f"Bearer {token}"},
            json={
                # specification of all options: https://platform.openai.com/docs/api-reference/chat/create
                "model": model,
                "temperature": temperature, # float
                "messages": [
                    {"role": "system", "content": f"Generate text for a meme, that express protest on a given topic. \
                    When writing these tweets, it is important to use the same language as the topic of protest is written in. Chose one random meme template from this list: {names_limited}\
                    Answer in the format of Python list of strings: [<meme template name from the list>, <top text>, <bottom text]\
                    Top and bottom text have to be shorter than 100 characters."},
                    {"role": "user", "content": "Oil prices"},
                    {"role": "assistant", "content": "['Ancient Aliens Guy', 'What if I told you',  'Oil prices were always meant to rise']"},
                    {"role": "user", "content": f"{prompt}"}
                ]
            },
        )

        if response.ok:
            meme_list = eval(response.json()["choices"][0]["message"]["content"])
            meme_name = meme_list[0]
            # find id of the meme template
            for template in templates:
                if template['name'] == meme_name:
                    meme_list[0] = template['id']
                    break

            # Create a meme
            url = f'https://api.memegen.link/images/{meme_list[0]}/{meme_list[1]}/{meme_list[2]}.png'
            url = url.replace(" ", "_")
            print(url)
            response = requests.get(url)

            return response.content