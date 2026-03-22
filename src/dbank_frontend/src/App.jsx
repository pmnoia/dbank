import { useState } from "react";
import { dbank_backend } from "declarations/dbank_backend";

function App() {
  // const [greeting, setGreeting] = useState("");

  // function handleSubmit(event) {
  //   event.preventDefault();
  //   const name = event.target.elements.name.value;
  //   dbank_backend.greet(name).then((greeting) => {
  //     setGreeting(greeting);
  //   });
  //   return false;
  // }

  return (
    <main>
      <div class="container">
        <img src="dbank_coin_logo.png" alt="DBank logo" width="200" />
        <h1>
          Current Balance: $<span id="value">300.00</span>
        </h1>
        <div class="divider"></div>
        <form action="#">
          <h2>Amount to Top Up</h2>
          <input
            id="input-amount"
            type="number"
            step="0.01"
            min={0}
            name="topUp"
            value=""
          />
          <h2>Amount to Withdraw</h2>
          <input
            id="withdrawal-amount"
            type="number"
            name="withdraw"
            step="0.01"
            min={0}
            value=""
          />
          <input id="submit-btn" type="submit" value="Finalise Transaction" />
        </form>
      </div>
      <footer>DBank © all rights reserved 2026</footer>
    </main>
  );
}

export default App;
