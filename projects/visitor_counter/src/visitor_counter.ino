#include <Wire.h>
#include <LiquidCrystal_I2C.h>

LiquidCrystal_I2C lcd(0x27, 16, 2);

int motionSensorTriggerPin = 13;
int motionSensorEchoPin = 12;

int totalVisitorsInside = 0;
int totalVisitorsEntered = 0;
int totalVisitorsLeft = 0;

bool isEntering = false;
bool isLeaving = false;
bool previousState = false;

long motionDetectionSpeed = 450;

int detectionDistance = 9;
int maximumDetectionDistance = 18;

void initializeLCD(){
  lcd.init();
  lcd.backlight();
}

void initializeUltrasonicSensor(){
  pinMode(motionSensorTriggerPin, OUTPUT);
  pinMode(motionSensorEchoPin, INPUT);
}

void setup(){
  initializeLCD();
  initializeUltrasonicSensor();
}

void displayCounters(){
  // Diplay text in LCD
  lcd.setCursor(0, 0);
	lcd.print("IN: ");
	lcd.setCursor(8, 0);
	lcd.print("OUT: ");
	lcd.setCursor(0, 1);
	lcd.print("Total Inside: ");
}

int calculateDistance(){
  long duration, distance;

  // Ultrasonic Sensor measurement
  digitalWrite(motionSensorTriggerPin, LOW);
  delayMicroseconds(2);
  digitalWrite(motionSensorTriggerPin, HIGH);
  delayMicroseconds(10);
  digitalWrite(motionSensorTriggerPin, LOW);
  
  // Calculate distance
  duration = pulseIn(motionSensorEchoPin, HIGH);
  distance = (duration / 2) / 29.1;

  return distance;
}

void displayUpdatedCounters(int column, int row, int value){
  lcd.setCursor(column, row);
  lcd.print("   "); // Clear previous value
  lcd.setCursor(column, row);
  lcd.print(value);
}

void loop(){
  
  displayCounters();
  int distance = calculateDistance();

  // Checks if the visitor is entering
  isEntering = (distance <= detectionDistance) ? true : false;
  
  delay(motionDetectionSpeed);

  if(isEntering != previousState){
    if(isEntering == true){
      totalVisitorsInside++;
    }

    displayUpdatedCounters(14, 1, totalVisitorsInside);
    totalVisitorsEntered++;
  }

  displayUpdatedCounters(4, 0, totalVisitorsEntered);


  // Checks if the visitor is leaving
  isLeaving = (distance > detectionDistance && distance <= maximumDetectionDistance) ? true : false;

  delay(motionDetectionSpeed);

  if(isLeaving != previousState){
    if(isLeaving == true){

      if(totalVisitorsInside <= 0 && totalVisitorsEntered <= 0){
        totalVisitorsLeft = 0;
        totalVisitorsInside = 0;
        totalVisitorsEntered = 0;
      }
      else{
        totalVisitorsInside--;
        totalVisitorsEntered--;
      }

    }

    if(totalVisitorsInside > 0 && totalVisitorsEntered > 0){
      totalVisitorsLeft++;
    }

    displayUpdatedCounters(14, 1, totalVisitorsInside);
    
  }

  displayUpdatedCounters(13, 0, totalVisitorsLeft);
  displayUpdatedCounters(14, 1, totalVisitorsInside);

  if(totalVisitorsInside <= 0){
    displayUpdatedCounters(14, 1, totalVisitorsInside);
  }
}