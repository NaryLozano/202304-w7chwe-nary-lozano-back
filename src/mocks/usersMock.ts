import { Types } from "mongoose";
import { type UserDataStructure } from "../server/types/types";

export const usersMock: UserDataStructure[] = [
  {
    _id: new Types.ObjectId(),
    username: "lukas23",
    password: "$2y$10$n5T9IBS8Jdmw2e/9dgepn.UdouXLvlii.INphieGCumjuxVsbW36.",
    fullName: "Lukas Müller",
    age: 23,
    interest: "sports",
    photo:
      "https://fastly.picsum.photos/id/883/200/200.jpg?hmac=evNCTcW3jHI_xOnAn7LKuFH_YkA8r6WdQovmsyoM1IY",
    friends: [],
    enemies: [],
  },
  {
    _id: new Types.ObjectId(),
    username: "isabella34",
    password: "$2y$10$HhV67J/8FJT5TvNeCh9/KOKDYIzQ2PTzMU5IrJxV3Q3plE05T2LHm",
    fullName: "Isabella Schmidt",
    age: 34,
    interest: "music",
    photo:
      "https://fastly.picsum.photos/id/1052/200/200.jpg?hmac=C8TAQ7jOmsdTxY6LFqx0ft2jNVIX0GxUmo8kCnVHkIE",
    friends: [],
    enemies: [],
  },
  {
    _id: new Types.ObjectId(),
    username: "alexander29",
    password: "$2y$10$kVAr8sSY4EGqt3wS/2ukxuKhC2kIWTVDzxKfEqHRJpIlQ81M8mM9O",
    fullName: "Alexander Wagner",
    age: 29,
    interest: "traveling",
    photo:
      "https://fastly.picsum.photos/id/421/200/200.jpg?hmac=Kix073-H73pkRedH4XJ8fenHLI9Sd9akWlOFjKog0EA",
    friends: [],
    enemies: [],
  },
];
