import {screen, render} from "@testing-library/react";
import {HashRouter} from "react-router-dom";
import {findAllTuits} from "../../services/tuits-service";
import axios from "axios";
import Tuits from "../../components/tuits";

jest.mock('axios');

const MOCKED_USERS = [
  "alice", "bob", "charlie"
];

const MOCKED_TUITS = [
  {
    tuit: "alice's tuit",
    postedBy: "",
    _id: "alice"
  },
  {
    tuit: "bob's tuit",
    postedBy: "",
    _id: "bob"
  },
  {
    tuit: "charlie's tuit",
    postedBy: "",
    _id: "charlie"
  }
];

test('tuit list renders static tuit array', () => {
  render(
      <HashRouter>
        <Tuits tuits={MOCKED_TUITS}/>
      </HashRouter>
  );

  const tuit = screen.getByText(/alice's tuit/i)
  expect(tuit).toBeInTheDocument()
});

test('tuit list renders mocked', async () => {
  axios.get.mockImplementation(() =>
      Promise.resolve({data: {tuits: MOCKED_TUITS}})
  )
  const response = await findAllTuits()
  const tuits = response.tuits

  render(
      <HashRouter>
        <Tuits tuits={tuits}/>
      </HashRouter>
  )

  const tuit = screen.getByText(/alice's tuit/i)
  expect(tuit).toBeInTheDocument()
});
