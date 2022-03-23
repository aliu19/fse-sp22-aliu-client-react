import {screen, render} from "@testing-library/react";
import {HashRouter} from "react-router-dom";
import {findAllUsers} from "../../services/users-service";
import {UserList} from "../../components/profile/user-list";
import React from "react";

test('user list renders async', async () => {
  const users = await findAllUsers();
  render(
    <HashRouter>
      <UserList users={users}/>
    </HashRouter>);
  const linkElement = screen.getByText(/alice/i);
  expect(linkElement).toBeInTheDocument();
})
