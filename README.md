# IAAS_GS
IAAS Ground Station 
Copyright International Association for Astronomical Studies (IAAS) 2022

Version: 1.0 
Last Updated: 09/09/2021 Tate Schrock


Necessary Node JS Modules:
 - Socket.IO
 - Express
 - SerialPort

Operation:
  A Node JS server is hosted on a Raspberry Pi (>3b) and receives telemetry strings from transmitting payloads through the serial port (ttyUSB0) at 9600 baud. These strings are then parsed by the client through a socket connection.
  
TODO:
 - Clean up server side and client side code
 - Implement server side data parsing (into JSON Object)
 - Log all strings as they are received and be capable of simultaneously tracking multiple payloads
 - (Future) Live Camera stream receiving 
 - Uplink (GET request) data to remote Near Real Time(NRT) tracking/reprocessing server
 - Various features, payload control, graphical 3d renders, etc.

Objective:
  Function as a dynamic framework capable of receiving, and parsing, data from various IAAS payloads to display and uplink data. 
