import {userDislikesTuit} from "../services/dislikes-service";
import {createUser, deleteUsersByUsername} from "../services/users-service";
import {createTuit, deleteTuit, findTuitById} from "../services/tuits-service";

describe('can dislike tuit with REST API', () => {
  const ripley = {
    username: 'ellenripley',
    password: 'lv426',
    email: 'ellenripley@aliens.com'
  };

  const ripleyTuit = {
    tuit: "ripley's tuit",
    _id: "623a1a3c209980c02f2917c7",
    postedBy: ""
  }

  beforeAll(async() => {
    await deleteUsersByUsername(ripley.username);
    const newUser = await createUser(ripley);
    await deleteTuit(ripleyTuit._id)
    ripleyTuit.postedBy = newUser._id;
    return await createTuit(ripleyTuit.postedBy, ripleyTuit)
  })

  afterAll(async () => {
    await deleteTuit(ripleyTuit._id)
    await deleteUsersByUsername(ripley.username)
    return await userDislikesTuit(ripleyTuit.postedBy, ripleyTuit._id)
  })

  test('can dislike tuit with REST API', async () => {
    // expect((await findTuitById(ripleyTuit._id)).stats.dislikes).toEqual(0)
    await userDislikesTuit(ripleyTuit.postedBy, ripleyTuit._id)
    const updatedTuit = await findTuitById(ripleyTuit._id)
    // console.log(updatedTuit)

    expect(updatedTuit.stats.dislikes).toEqual(1)
  })
})

describe('can undislike tuit with REST API', () => {
  const ripley = {
    username: 'ellenripley',
    password: 'lv426',
    email: 'ellenripley@aliens.com'
  };

  const ripleyTuit = {
    tuit: "ripley's tuit",
    _id: "623a1a3c209980c02f2917c7",
    postedBy: "",
    stats: {
      dislikes: 0
    }
  }

  beforeAll(async() => {
    await deleteUsersByUsername(ripley.username);
    const newUser = await createUser(ripley);
    await deleteTuit(ripleyTuit._id)
    ripleyTuit.postedBy = newUser._id;
    await createTuit(ripleyTuit.postedBy, ripleyTuit)
    return await userDislikesTuit(ripleyTuit.postedBy, ripleyTuit._id)
  })

  afterAll(async () => {
    await deleteTuit(ripleyTuit._id)
    await deleteUsersByUsername(ripley.username)
    return await userDislikesTuit(ripleyTuit.postedBy, ripleyTuit._id)
  })

  test('can undislike tuit with REST API', async () => {
    // const originalTuit = await findTuitById(ripleyTuit._id)
    // expect(originalTuit.stats.dislikes).toEqual(1)

    await userDislikesTuit(ripleyTuit.postedBy, ripleyTuit._id)
    const updatedTuit = await findTuitById(ripleyTuit._id)

    expect(updatedTuit.stats.dislikes).toEqual(0)
  })
})
