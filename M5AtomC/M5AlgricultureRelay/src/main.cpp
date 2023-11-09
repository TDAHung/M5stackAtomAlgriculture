#include "M5Atom.h"
#include "modbus.h"
#include "wifi_setup.h"
#include "MQTT_helper.h"

// Global Variables
MODBUS_CABINET relay;
Wifi_esp32 wifi("HPCCLAB", "hpccw1f1");
MyMQTT myMqtt("io.adafruit.com", "Suchuru", "aio_rctQ44tIQlubyfnpLYr68iav0PB8");

void setup()
{
    M5.begin(true, false, true);
    Serial2.begin(9600, SERIAL_8N1, 22, 19);
    M5.dis.drawpix(0, 0x00ff00);
    wifi.setupWifi();
    myMqtt.connectToMQTT();
    myMqtt.subscribe("Suchuru/feeds/relay.solution1");
    myMqtt.subscribe("Suchuru/feeds/relay.solution2");
    myMqtt.subscribe("Suchuru/feeds/relay.solution3");
    myMqtt.subscribe("Suchuru/feeds/relay.subdivision1");
    myMqtt.subscribe("Suchuru/feeds/relay.subdivision2");
    myMqtt.subscribe("Suchuru/feeds/relay.subdivision3");
    myMqtt.subscribe("Suchuru/feeds/relay.pumpin");
    myMqtt.subscribe("Suchuru/feeds/relay.pumpout");
}

void loop()
{
    myMqtt.checkConnect();
    M5.update();
}
