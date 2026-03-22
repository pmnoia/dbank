import Debug "mo:base/Debug";
import Time "mo:base/Time";
import Float "mo:base/Float";

persistent actor DBank {
  var currentValue : Float = 300.0;
  currentValue := 300.0;

  let id = 12148903124780;

  var startTime = Time.now();
  startTime := Time.now();
  Debug.print(debug_show (startTime));

  public func topUp(amount : Float) {
    currentValue += amount;
    Debug.print(debug_show (currentValue));
  };

  public func withdraw(amount : Float) {
    let tempValue : Float = currentValue - amount;

    if (tempValue >= 0.0) {
      currentValue -= amount;
      Debug.print(debug_show (currentValue));
    } else {
      Debug.print("Sorry! You don't have enough balance to do that.");
    };
  };

  public query func checkBalance() : async Float {
    Debug.print(debug_show (currentValue));
    return currentValue;
  };

  public func compound() {
    let currentTime = Time.now();
    let timeElapsedNS = currentTime - startTime;

    let timeElapsedFloat = Float.fromInt(timeElapsedNS);
    let timeElapsedS = timeElapsedFloat / 1000000000.0;
    currentValue := currentValue * (1.01 ** timeElapsedS);

    startTime := currentTime;
  };
};
