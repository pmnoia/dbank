import { useEffect, useRef, useState } from "react";
import { Actor, HttpAgent } from "@icp-sdk/core/agent";
import { idlFactory, canisterId } from "declarations/dbank_backend";

function App() {
  const [balance, setBalance] = useState(0);
  const [topUpAmount, setTopUpAmount] = useState("");
  const [withdrawAmount, setWithdrawAmount] = useState("");
  const backend = useRef(null);

  async function fetchBalance() {
    try {
      console.log("1. Requesting balance from backend...");
      const currentBalance = await backend.current.checkBalance();
      console.log("2. Backend responded with:", currentBalance);
      setBalance(currentBalance.toFixed(2));
    } catch (error) {
      console.error("3. Houston, we have a problem:", error);
    }
  }

  useEffect(() => {
    async function init() {
      const agent = new HttpAgent();
      if (process.env.DFX_NETWORK !== "ic") {
        await agent.fetchRootKey();
      }
      backend.current = Actor.createActor(idlFactory, { agent, canisterId });
      await fetchBalance();
    }
    init();
  }, []);

  async function handleTransaction(event) {
    event.preventDefault();

    // TOP UP Process
    if (topUpAmount !== "" && Number(topUpAmount) > 0) {
      await backend.current.topUp(parseFloat(topUpAmount));
    }

    // WITHDRAW Process
    if (withdrawAmount !== "" && Number(withdrawAmount) > 0) {
      await backend.current.withdraw(parseFloat(withdrawAmount));
    }

    // Compound Interest and fetch new balance
    await backend.current.compound();
    await fetchBalance();

    // Reset input fields
    setTopUpAmount("");
    setWithdrawAmount("");
  }

  return (
    <main>
      <div className="container">
        <img src="dbank_coin_logo.png" alt="DBank logo" width="200" />
        <h1>
          Current Balance: $<span id="value">{balance}</span>
        </h1>
        <div className="divider"></div>
        <form onSubmit={handleTransaction}>
          <h2>Amount to Top Up</h2>
          <input
            id="input-amount"
            type="number"
            step="0.01"
            min={0}
            name="topUp"
            value={topUpAmount}
            onChange={(e) => setTopUpAmount(e.target.value)}
          />
          <h2>Amount to Withdraw</h2>
          <input
            id="withdrawal-amount"
            type="number"
            name="withdraw"
            step="0.01"
            min={0}
            value={withdrawAmount}
            onChange={(e) => setWithdrawAmount(e.target.value)}
          />
          <input id="submit-btn" type="submit" value="Finalise Transaction" />
        </form>
      </div>
      <footer>DBank © all rights reserved 2026</footer>
    </main>
  );
}

export default App;
