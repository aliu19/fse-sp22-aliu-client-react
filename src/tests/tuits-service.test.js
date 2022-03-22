import {
  createTuit, deleteTuit, findAllTuits, findTuitById
} from "../services/tuits-service"

import {
  createUser,
  deleteUsersByUsername
} from "../services/users-service";

// sample user
const ripley = {
  username: 'ellenripley',
  password: 'lv426',
  email: 'ellenripley@aliens.com'
};

// sample tuit
const ripleyTuit = {
  tuit: "ripley's tuit",
  _id: "623a1a3c209980c02f2917c7",
  postedBy: ""
}

describe('can create tuit with REST API', () => {
  // setup test before running test
  beforeAll(async () => {
    // remove any/all users to make sure we create it in the test
    await deleteUsersByUsername(ripley.username);
    const newUser = await createUser(ripley);
    ripleyTuit.postedBy = newUser._id;
    return deleteTuit(ripleyTuit._id)
  })

  // clean up after test runs
  afterAll(async () => {
    // remove any data we created
    await deleteUsersByUsername(ripley.username)
    return await deleteTuit(ripleyTuit._id)
  })

  test('can insert new tuit with REST API', async () => {
    // insert new user in the database
    const newTuit = await createTuit(ripleyTuit.postedBy, ripleyTuit)

    // verify inserted tuit's properties match
    expect(newTuit.tuit).toEqual(ripleyTuit.tuit);
    expect(newTuit.postedBy).toEqual(ripleyTuit.postedBy)
  });
});

describe('can delete tuit wtih REST API', () => {
  // setup the tests before verification
  beforeAll(async () => {
    await deleteUsersByUsername(ripley.username);
    const newUser = await createUser(ripley);
    await deleteTuit(ripleyTuit._id)
    ripleyTuit.postedBy = newUser._id;
    return await createTuit(ripleyTuit.postedBy, ripleyTuit)
  });

  // clean up after test runs
  afterAll(async () => {
    // remove any data we created
    return await deleteUsersByUsername(ripley.username)
  })

  test('can delete tuit from REST API by id', async () => {
    // delete a user by their username. Assumes user already exists
    const status = await deleteTuit(ripleyTuit._id);

    // verify we deleted at least one user by their username
    expect(status.deletedCount).toBeGreaterThanOrEqual(1);
  });
});

describe('can retrieve a tuit by their primary key with REST API', () => {
  // setup the tests before verification
  beforeAll(async () => {
    await deleteUsersByUsername(ripley.username);
    const newUser = await createUser(ripley);
    ripleyTuit.postedBy = newUser._id;
    return await deleteTuit(ripleyTuit._id)
  });

  // clean up after test runs
  afterAll(async () => {
    // remove any data we created
    await deleteUsersByUsername(ripley.username)
    return await deleteTuit(ripleyTuit._id);
  })

  test('can retrieve tuit from REST API by primary key', async () => {
    // insert the tuit in the database
    const newTuit = await createTuit(ripleyTuit.postedBy, ripleyTuit)

    // verify new tuit matches the parameter tuit
    expect(newTuit.tuit).toEqual(ripleyTuit.tuit);
    expect(newTuit._id).toEqual(ripleyTuit._id);
    expect(newTuit.postedBy).toEqual(ripleyTuit.postedBy);

    // retrieve the tuit from the database by its primary key
    const existingTuit = await findTuitById(newTuit._id);

    // verify retrieved tuit matches parameter tuit
    expect(existingTuit.tuit).toEqual(ripleyTuit.tuit);
    expect(existingTuit._id).toEqual(ripleyTuit._id);
    expect(existingTuit.postedBy._id).toEqual(ripleyTuit.postedBy);
  });
});

describe('can retrieve all tuits with REST API', () => {
  // sample users we'll insert to then retrieve
  const insertTuits = [
    {
      tuit: "one tuit",
      _id: "623a1a3c209980c02f2917c7",
      postedBy: ""
    },
    {
      tuit: "two tuit",
      _id: "623a1a3c209980c02f2917c8",
      postedBy: ""
    },
    {
      tuit: "three tuit",
      _id: "623a1a3c209980c02f2917c9",
      postedBy: ""
    }
  ];

  let newUser = null

  // setup data before test
  beforeAll( async () => {
    await deleteUsersByUsername(ripley.username);
    newUser = await createUser(ripley);

    return insertTuits.map(async(tuit) => {
      await deleteTuit(tuit._id)
      tuit.postedBy = newUser._id
      return await createTuit(tuit.postedBy, tuit)
    })
  });

  // clean up after ourselves
  afterAll( async () => {
    await deleteUsersByUsername(ripley.username)
    // delete the tuits we inserted
    return insertTuits.map(async (tuit) =>
        await deleteTuit(tuit._id)
    )
  });

  test('can retrieve all tuits from REST API', async () => {
    // retrieve all the tuits
    const allTuits = await findAllTuits();

    // there should be a minimum number of tuits
    expect(allTuits.length).toBeGreaterThanOrEqual(insertTuits.length);

    // let's check each tuit we inserted
    const tuitsWeInserted = allTuits.filter(
        tuit => insertTuits.indexOf(tuit.tuit) >= 0);

    // compare the actual tuits in database with the ones we sent
    tuitsWeInserted.forEach(tuit => {
      const tuitText = insertTuits.find(tuitText => tuitText === tuit.tuit);
      expect(tuit.tuit).toEqual(tuitText);
      expect(tuit.postedBy).toEqual(newUser._id);
    });
  });
});
