import {render, screen} from "@testing-library/react";
import {HashRouter} from "react-router-dom";
import Tuits from "../../components/tuits";
import {findAllTuitsDislikedByUser} from "../../services/dislikes-service";
import axios from "axios";

jest.mock('axios');

const MOCKED_TUITS = [
  {
    tuit: "alice's tuit",
    postedBy: "",
    _id: "alice",
    stats: {
      dislikes: 1
    }
  },
  {
    tuit: "bob's tuit",
    postedBy: "",
    _id: "bob",
    stats: {
      dislikes: 0
    }
  },
  {
    tuit: "charlie's tuit",
    postedBy: "",
    _id: "charlie",
    stats: {
      dislikes: 1
    }
  }
];

test('dislike list renders static tuit array', () => {
  render(
      <HashRouter>
        <Tuits tuits={MOCKED_TUITS}/>
      </HashRouter>
  );

  const tuit = screen.getByText(/alice's tuit/i)
  expect(tuit).toBeInTheDocument()
})

// TODO
test('dislike list renders mocked', async () => {
  axios.get.mockImplementation(() =>
      Promise.resolve({data: {tuits: MOCKED_TUITS}})
  )

  const response = await findAllTuitsDislikedByUser("alice")
  const tuits = response.tuits

  render(
      <HashRouter>
        <Tuits tuits={tuits}/>
      </HashRouter>
  )

  const tuit = screen.getByText(/alice's tuit/i)
  expect(tuit).toBeInTheDocument()
})
