# Visitor Counting System using Arduino

## Project Overview

Welcome to the Visitor Counting System using Arduino! This project involves counting the number of visitors entering, leaving, and the total number of visitors inside a location. The system utilizes an ultrasonic sensor to detect the distance of visitors and an I2C-enabled LCD to display the visitor counts in real-time.

## Circuit Design

### Components Used:
- Arduino
- Ultrasonic Sensor
- I2C-enabled LCD

### Connection Details:
- Connect the VCC and GND of the ultrasonic sensor to the respective VCC (5V) and GND on the Arduino.
- Connect the TRIG and ECHO pins of the ultrasonic sensor to the motionSensorTriggerPin (Pin 13) and motionSensorEchoPin (Pin 12) on the Arduino, respectively.
- Connect the SDA and SCL pins of the I2C-enabled LCD to the respective SDA and SCL pins on the Arduino.

This simple Visitor Counting System can be customized and extended based on your needs.

