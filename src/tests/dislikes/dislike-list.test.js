import {render, screen} from "@testing-library/react";
import {HashRouter} from "react-router-dom";
import Tuits from "../../components/tuits";
import {findAllTuitsDislikedByUser} from "../../services/dislikes-service";

// TODO
test('dislike renders async', async () => {
  const tuits = await findAllTuitsDislikedByUser("6249330bb2dd198dfefc1167")

  render(
      <HashRouter>
        <Tuits tuits={tuits}/>
      </HashRouter>
  )

  const tuit = screen.getByText(/alice 2/i)
  expect(tuit).toBeInTheDocument()
})
