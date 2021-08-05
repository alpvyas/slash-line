from flask import session
from app.models import db, Profile


def seed_profiles():

    profiles = [
        {
            "bio": "I'm the demo user! My name is Demo! Use my account to check out what Slash Line Baseball has to offer!",
            "location": "Los Angeles, California",
            "avatar": "",
            "user_id": 1,
        },
        {
            "bio": "Greatest pitcher of his generation? All Star ace? That's what they're saying, but I just love playing baseball. ",
            "location": "Los Angeles, California",
            "avatar": "",
            "user_id": 2,
        },
        {
            "bio": "Gold Glove defender for the Los Angeles Dodgers",
            "location": "Los Angeles, California",
            "avatar": "",
            "user_id": 3,
        },
        {
            "bio": "Hi, I'm Dick Mountain.",
            "location": "Los Angeles, California",
            "avatar": "",
            "user_id": 4,
        },
        {
            "bio": "Nice swing, bitch.",
            "location": "Los Angeles, California",
            "avatar": "",
            "user_id": 5,
        },
        {
            "bio": "Closer for LAD.",
            "location": "Los Angeles, California",
            "avatar": "",
            "user_id": 6,
        },
        {
            "bio": "I'm Dustin! Currently out for the season due to Tommy John.",
            "location": "Los Angeles, California",
            "avatar": "",
            "user_id": 7,
        },
        {
            "bio": "",
            "location": "Los Angeles, California",
            "avatar": "",
            "user_id": 8,
        },
        {
            "bio": "",
            "location": "Los Angeles, California",
            "avatar": "",
            "user_id": 9,
        },
        {
            "bio": "",
            "location": "Los Angeles, California",
            "avatar": "",
            "user_id": 10,
        },
        {
            "bio": "",
            "location": "Los Angeles, California",
            "avatar": "",
            "user_id": 11,
        },
        {
            "bio": "",
            "location": "Los Angeles, California",
            "avatar": "",
            "user_id": 12,
        },
        {
            "bio": "",
            "location": "Los Angeles, California",
            "avatar": "",
            "user_id": 13,
        },
        {
            "bio": "",
            "location": "Los Angeles, California",
            "avatar": "",
            "user_id": 14,
        },
        {
            "bio": "",
            "location": "Los Angeles, California",
            "avatar": "",
            "user_id": 15,
        },
        {
            "bio": "",
            "location": "Los Angeles, California",
            "avatar": "",
            "user_id": 16,
        },
        {
            "bio": "",
            "location": "Los Angeles, California",
            "avatar": "",
            "user_id": 17,
        },
        {
            "bio": "",
            "location": "Los Angeles, California",
            "avatar": "",
            "user_id": 18,
        },
        {
            "bio": "",
            "location": "Los Angeles, California",
            "avatar": "",
            "user_id": 19,
        },
        {
            "bio": "",
            "location": "Los Angeles, California",
            "avatar": "",
            "user_id": 20,
        },
        {
            "bio": "",
            "location": "Los Angeles, California",
            "avatar": "",
            "user_id": 21,
        },
        {
            "bio": "",
            "location": "Los Angeles, California",
            "avatar": "",
            "user_id": 22,
        },
        {
            "bio": "",
            "location": "Los Angeles, California",
            "avatar": "",
            "user_id": 23,
        },
        {
            "bio": "",
            "location": "Los Angeles, California",
            "avatar": "",
            "user_id": 24,
        },
        {
            "bio": "",
            "location": "Los Angeles, California",
            "avatar": "",
            "user_id": 25,
        },
        {
            "bio": "",
            "location": "Los Angeles, California",
            "avatar": "",
            "user_id": 26,
        },
        {
            "bio": "",
            "location": "Los Angeles, California",
            "avatar": "",
            "user_id": 27,
        },
        {
            "bio": "",
            "location": "Los Angeles, California",
            "avatar": "",
            "user_id": 28,
        },
        {
            "bio": "",
            "location": "Los Angeles, California",
            "avatar": "",
            "user_id": 29,
        },
        {
            "bio": "",
            "location": "Los Angeles, California",
            "avatar": "",
            "user_id": 30,
        },
    ]

    for data in profiles:
        profile = Profile(bio=data["bio"],
                          location=data["location"],
                          avatar=data["avatar"],
                          user_id=data["user_id"],
                          )

        db.session.add(profile)
        db.session.commit()
