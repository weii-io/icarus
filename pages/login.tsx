import React from "react";

type Props = {};

function login({}: Props) {
  return (
    <div>
      <form>
        <div>
          <label htmlFor="email">Email:</label>
          <input required type="email" name="email" placeholder="Email" />
        </div>
        <div>
          <label htmlFor="password">Password:</label>
          <input
            required
            type="password"
            name="password"
            placeholder="Password"
          />
        </div>
        <button type="submit">Login</button>
      </form>
    </div>
  );
}

export default login;
