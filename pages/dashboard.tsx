import React from "react";
import { Layout } from "../components";

type Props = {};

function dashboard({}: Props) {
  return (
    <Layout>
      <aside>
        <ul>
          <li>Projects</li>
          <li>Tasks</li>
          <li>Setting</li>
        </ul>
      </aside>
      <section>
        <div>
          <h1>Projects</h1>
          <div>
            <div>
              <h2>Project 1</h2>
              <p>Project 1 description</p>
            </div>
            <div>
              <h2>Project 2</h2>
              <p>Project 2 description</p>
            </div>
            <div>
              <h2>Project 3</h2>
              <p>Project 3 description</p>
            </div>
          </div>
        </div>
      </section>
    </Layout>
  );
}

export default dashboard;
