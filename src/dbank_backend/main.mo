import Debug "mo:base/Debug";
import Time "mo:base/Time";
import Float "mo:base/Float";

persistent actor DBank {
  // Initialize
  var currentValue : Float = 300.0;
  let id = 12148903124780;
  var startTime = Time.now();

  public func topUp(amount : Float) {
    currentValue += amount;
    // Debug.print(debug_show (currentValue));
  };

  public func withdraw(amount : Float) {
    if ((currentValue - amount) >= 0.0) {
      currentValue -= amount;
      // Debug.print(debug_show (currentValue));
    } else {
      Debug.print("Sorry! You don't have enough balance to do that.");
    };
  };

  public query func checkBalance() : async Float {
    // Debug.print(debug_show (currentValue));
    return currentValue;
  };

  // Interest 1% per second for demonstartion purpose
  // public func compound() {
  //   let currentTime = Time.now();
  //   let timeElapsedNS = currentTime - startTime;
  //   let timeElapsedFloat = Float.fromInt(timeElapsedNS);
  //   let timeElapsedS = timeElapsedFloat / 1000000000.0;

  //   currentValue := currentValue * (1.01 ** timeElapsedS);
  //   startTime := currentTime;
  // };

  // Interest 1% per minute
  public func compound() {
    let currentTime = Time.now();
    let timeElapsedNS = currentTime - startTime;

    let timeElapsedFloat = Float.fromInt(timeElapsedNS);
    let timeElapsedS = timeElapsedFloat / 1000000000.0;

    // Slow down the compounding to 1% per MINUTE
    let timeElapsedMinutes = timeElapsedS / 60.0;
    currentValue := currentValue * (1.01 ** timeElapsedMinutes);

    startTime := currentTime;
  };
};
