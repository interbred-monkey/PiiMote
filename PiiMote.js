/****************************************************************/
/*                                                              */
/*    PiiMote                                                   */
/*    Turns a Wii remote into a user input for raspberry pi     */
/*                                                              */
/****************************************************************/

var btSerial = new (require('bluetooth-serial-port')).BluetoothSerialPort();

btSerial.on('found', function(address, name) {

  console.log(name, address);

  btSerial.findSerialPortChannel(address, function(channel) {
    btSerial.connect(address, channel, function() {
        console.log('connected');

        // to write to the bt device
        btSerial.write('my data');

        // receive data from the bt device  
        btSerial.on('data', function(data) {
            console.log(data);
        });
    }, function () {
        console.log('cannot connect');
    });

    // close the connection when you're ready
    btSerial.close();        
  });
});

btSerial.inquire();