import random

import requests


def get_tweet(prompt, temperature):
    temperature = float(1.0 - temperature / 100)

    model = "gpt-4"
    token = "At6UbHxSFA2iygYCkQmhhvqQKmyReq"

    if temperature < 0.8:
        response = requests.post(
            "https://openai-api.meetings.bio/api/openai/chat/completions",
            headers={"Authorization": f"Bearer {token}"},
            json={
                # specification of all options: https://platform.openai.com/docs/api-reference/chat/create
                "model": model,
                "temperature": temperature,  # float
                "messages": [
                    # {"role": "system", "content": "You are a Twitter post writter, who writtes tweets that protest on given topic. You write a tweet in the same language as the topic of protest is written in."},
                    {
                        "role": "system",
                        "content": "As a Twitter post writer, your job is to write tweets that express protest on a given topic. \
                     When writing these tweets, it is important to use the same language as the topic of protest is written in.\
                     Also at the end of the post mention relavant politicians, that are responsible for the topic of protest. They have to be from the country of language of the post.",
                    },
                    {"role": "user", "content": "Davki kmetov"},
                    {
                        "role": "assistant",
                        "content": "Obdavčevanje naših pridnih kmetov je sramota! Slovenija se mora zavedati, da je naša kmetijska industrija hrbtenica našega gospodarstva. \
                                                    Nehajte kaznovati tiste, ki nam zagotavljajo hrano, in začnite jih podpirati! #StopDavkomNaKmete #SlovenskaKmetijstvo #PodpriteKmete @MKGP_RS @vladaRS",
                    },
                    {"role": "user", "content": f"{prompt}"},
                ],
            },
        )
        if response.ok:
            print(response.json()["choices"][0]["message"]["content"])

        return {"text": response.json()["choices"][0]["message"]["content"]}

    else:
        # fetch the list of templates
        response = requests.get("https://api.memegen.link/templates?animated=false")
        templates = response.json()

        # get all names
        names = [template["name"] for template in templates]
        names_limited = random.sample(names, 20)

        # delete names with "'"
        for name in names_limited:
            if "'" in name:
                names_limited.remove(name)

        response = requests.post(
            "https://openai-api.meetings.bio/api/openai/chat/completions",
            headers={"Authorization": f"Bearer {token}"},
            json={
                # specification of all options: https://platform.openai.com/docs/api-reference/chat/create
                "model": model,
                "temperature": temperature,  # float
                "messages": [
                    {
                        "role": "system",
                        "content": f"Generate text for a meme, that express protest on a given topic. \
                    When writing these tweets, it is important to use the same language as the topic of protest is written in. \
                     After choosing the text, choose the most appropriate template for given text: {names_limited}\
                    Answer in the format of Python list of strings: [<meme template name from the list>, <top text>, <bottom text>, [<politicians mentions>]]\
                    Top and bottom text have to be shorter than 100 characters.",
                    },
                    {"role": "user", "content": "Oil prices"},
                    {
                        "role": "assistant",
                        "content": "['Ancient Aliens Guy', 'What if I told you',  'Oil prices were always meant to rise', ['@JoeBiden', '@@WhiteHouse']]",
                    },
                    {"role": "user", "content": f"{prompt}"},
                ],
            },
        )

        if response.ok:
            meme_list = eval(response.json()["choices"][0]["message"]["content"])
            meme_name = meme_list[0]
            # find id of the meme template
            for template in templates:
                if template["name"].lower() == meme_name.lower():
                    if template["lines"] == 1:
                        meme_list = [meme_list[0], meme_list[1] + " " + meme_list[2]]
                    meme_list[0] = template["id"]
                    break

            print(meme_list[3])

            # Create a meme
            url = f'https://api.memegen.link/images/{"/".join(meme_list[:-1])}.png'
            url = url.replace(" ", "_")
            print(url)
            # response = requests.get(url)

            return {"image": url, "text": " ".join(meme_list[3])}
