#include <M5Atom.h>
#include "sensor_data.h"
#include "wifi_setup.h"
#include "MQTT_helper.h"
#include "bits/stdc++.h"

// Class Wifi_esp32
Wifi_esp32 wifi("HPCCLAB", "hpccw1f1");
// Class MyMQTT
MyMQTT myMQTT("io.adafruit.com", "Suchuru", "aio_rctQ44tIQlubyfnpLYr68iav0PB8");

void setup()
{
    // put your setup code here, to run once:
    M5.begin(true, false, true);
    Serial2.begin(9600, SERIAL_8N1, 22, 19);
    wifi.setupWifi();
    myMQTT.connectToMQTT();
    // myMQTT.subscribe("Suchuru/feeds/env.temperature");
    // myMQTT.subscribe("Suchuru/feeds/env.humidity");
    // myMQTT.subscribe("Suchuru/feeds/env.ph");
    // myMQTT.subscribe("Suchuru/feeds/env.ec");
    // myMQTT.subscribe("Suchuru/feeds/env.nitro");
    // myMQTT.subscribe("Suchuru/feeds/env.phosphorus");
    // myMQTT.subscribe("Suchuru/feeds/env.kalium");
    // myMQTT.subscribe("Suchuru/feeds/air.co2");
    // myMQTT.subscribe("Suchuru/feeds/air.humidity");
    // myMQTT.subscribe("Suchuru/feeds/air.lux");
    // myMQTT.subscribe("Suchuru/feeds/air.temperature");
}

enum state
{
    INIT,
    AIR_MEASURE,
    SOIL_MEASURE_PH,
    SOIL_MEASURE_TEMP_HUMIDITY,
    SOIL_MEASURE_NPK,
    SOIL_MEASURE_EC
};

enum state current_state = INIT;
float soil_PH = 1, soil_temperature = 2, soil_humidity = 3, soil_N = 4, soil_P = 5, soil_K = 6, soil_EC = 7;
float air_temperature, air_humidity, air_illuminance = 0, air_CO2 = 0;
SENSOR_RS485 data485;

void fsm_measurement()
{
    switch (current_state)
    {
    case INIT:
        current_state = AIR_MEASURE;
        break;
    case AIR_MEASURE:
        Serial.println("Writing to air with data...");
        myMQTT.checkConnect();
        Serial2.write(data485.getDataAIR_HUMIDITY_TEMPERATURE(), 8);
        delay(1000);
        if (Serial2.available())
        { // If the serial port receives a message.
            uint8_t receivedData[9];
            Serial2.readBytes(receivedData, sizeof(receivedData)); // Read the message.
            for (int i = 0; i < 9; i++)
            {
                Serial.print("0x");
                Serial.print(receivedData[i], HEX);
                Serial.print(", ");
            }
            Serial.println();
            air_humidity = (int)receivedData[3] * 256 + (int)receivedData[4];
            air_temperature = (int)receivedData[5] * 256 + (int)receivedData[6];
            air_humidity /= 10.0;
            air_temperature /= 10.0;
            Serial.print("Air humidity: ");
            Serial.println(air_humidity);
            Serial.print("Air temperature: ");
            Serial.println(air_temperature);
            Serial.print("temperature: ");
            Serial.println(String(air_temperature));
            Serial.print("humidity: ");
            Serial.println(String(air_humidity));
            Serial.print("Illuminance: ");
            Serial.println(String(air_illuminance));
            Serial.print("Co2: ");
            Serial.println(String(air_CO2));
            Serial.println();
            myMQTT.publish("Suchuru/feeds/air.co2", String(air_CO2));
            myMQTT.publish("Suchuru/feeds/air.humidty", String(air_humidity));
            myMQTT.publish("Suchuru/feeds/air.temperature", String(air_temperature));
            myMQTT.publish("Suchuru/feeds/air.lux", String(air_illuminance));
            myMQTT.checkConnect();
        }
        delay(5000);
        current_state = SOIL_MEASURE_PH;
        break;

    case SOIL_MEASURE_PH:
        myMQTT.checkConnect();
        Serial.println("Writing to soil PH with data...");
        Serial2.write(data485.getDataSOIL_PH(), 8);
        delay(1000);
        if (Serial2.available())
        { // If the serial port receives a message.
            uint8_t receivedData[7];
            Serial2.readBytes(receivedData, sizeof(receivedData)); // Read the message.
            for (int i = 0; i < 7; i++)
            {
                Serial.print("0x");
                Serial.print(receivedData[i], HEX);
                Serial.print(", ");
            }
            Serial.println();
            soil_PH = (int)receivedData[3] * 256 + (int)receivedData[4];
            soil_PH /= 100.0;
            Serial.print("Soil PH = ");
            Serial.println(soil_PH);
            myMQTT.checkConnect();
        }
        delay(5000);
        current_state = SOIL_MEASURE_TEMP_HUMIDITY;
        break;
    case SOIL_MEASURE_TEMP_HUMIDITY:
        myMQTT.checkConnect();
        Serial.println("Writing to soil temperature and humidity with data...");
        Serial2.write(data485.getDataSOIL_TEMPERATURE_HUMIDITY(), 8);
        delay(1000);
        if (Serial2.available())
        { // If the serial port receives a message.
            uint8_t receivedData[9];
            Serial2.readBytes(receivedData, sizeof(receivedData)); // Read the message.
            for (int i = 0; i < 9; i++)
            {
                Serial.print("0x");
                Serial.print(receivedData[i], HEX);
                Serial.print(", ");
            }
            Serial.println();
            soil_humidity = (int)receivedData[3] * 256 + (int)receivedData[4];
            soil_temperature = (int)receivedData[5] * 256 + (int)receivedData[6];
            soil_humidity /= 10.0;
            soil_temperature /= 10.0;
            Serial.print("Soil humidity: ");
            Serial.println(soil_humidity);
            Serial.print("Soil temperature: ");
            Serial.println(soil_temperature);
            myMQTT.publish("Suchuru/feeds/env.temperature", String(soil_temperature));
            myMQTT.publish("Suchuru/feeds/env.humidity", String(soil_humidity));
            myMQTT.checkConnect();
        }

        delay(5000);
        current_state = SOIL_MEASURE_NPK;
        break;
    case SOIL_MEASURE_NPK:
        myMQTT.checkConnect();
        Serial.println("Writing to soil NPK with data...");
        Serial2.write(data485.getDataSOIL_NPK(), 8);
        delay(1000);
        if (Serial2.available())
        { // If the serial port receives a message.
            uint8_t receivedData[11];
            Serial2.readBytes(receivedData, sizeof(receivedData)); // Read the message.
            for (int i = 0; i < 11; i++)
            {
                Serial.print("0x");
                Serial.print(receivedData[i], HEX);
                Serial.print(", ");
            }
            Serial.println();
            soil_N = (int)receivedData[3] * 256 + (int)receivedData[4];
            soil_P = (int)receivedData[5] * 256 + (int)receivedData[6];
            soil_K = (int)receivedData[7] * 256 + (int)receivedData[8];
            Serial.print("Soil Nito: ");
            Serial.println(soil_N);
            Serial.print("Soil Photpho: ");
            Serial.println(soil_P);
            Serial.print("Soil Kali: ");
            Serial.println(soil_K);

            myMQTT.checkConnect();
        }
        delay(5000);
        current_state = SOIL_MEASURE_EC;
        break;
    case SOIL_MEASURE_EC:
        myMQTT.checkConnect();
        Serial.println("Writing to soil conductivity with data...");
        Serial2.write(data485.getDataSOIL_CONDUCTIVITY(), 8);
        delay(1000);
        if (Serial2.available())
        { // If the serial port receives a message.
            uint8_t receivedData[7];
            Serial2.readBytes(receivedData, sizeof(receivedData)); // Read the message.
            for (int i = 0; i < 7; i++)
            {
                Serial.print("0x");
                Serial.print(receivedData[i], HEX);
                Serial.print(", ");
            }
            Serial.println();
            soil_EC = (int)receivedData[3] * 256 + (int)receivedData[4];
            Serial.print("Soil EC: ");
            Serial.println(soil_EC);
            myMQTT.checkConnect();
            Serial.print("ec: ");
            Serial.println(String(soil_EC));
            myMQTT.checkConnect();
        }
        delay(5000);
        current_state = AIR_MEASURE;
        break;
    }
}

void loop()
{
    // put your main code here, to run repeatedly:
    myMQTT.checkConnect();
    String data_to_pub;
    SENSOR_RS485 data485;

    Serial.println("Writing to air with data...");

    Serial2.write(data485.getDataAIR_HUMIDITY_TEMPERATURE(), 8);
    delay(1000);
    if (Serial2.available())
    { // If the serial port receives a message.
        uint8_t receivedData[9];
        Serial2.readBytes(receivedData, sizeof(receivedData)); // Read the message.
        for (int i = 0; i < 9; i++)
        {
            Serial.print("0x");
            Serial.print(receivedData[i], HEX);
            Serial.print(", ");
        }
        Serial.println();
        air_humidity = (int)receivedData[3] * 256 + (int)receivedData[4];
        air_temperature = (int)receivedData[5] * 256 + (int)receivedData[6];
        air_humidity /= 10.0;
        air_temperature /= 10.0;
        Serial.print("Air humidity: ");
        Serial.println(air_humidity);
        Serial.print("Air temperature: ");
        Serial.println(air_temperature);
        myMQTT.publish("Suchuru/feeds/air.co2", String(air_CO2));
        myMQTT.publish("Suchuru/feeds/air.humidty", String(air_humidity));
        myMQTT.publish("Suchuru/feeds/air.temperature", String(air_temperature));
        myMQTT.publish("Suchuru/feeds/air.lux", String(air_illuminance));
        // data.print();
        Serial.println();
    }
    delay(5000);
    myMQTT.checkConnect();

    Serial.println("Writing to soil PH with data...");
    Serial2.write(data485.getDataSOIL_PH(), 8);
    delay(1000);
    if (Serial2.available())
    { // If the serial port receives a message.
        uint8_t receivedData[7];
        Serial2.readBytes(receivedData, sizeof(receivedData)); // Read the message.
        for (int i = 0; i < 7; i++)
        {
            Serial.print("0x");
            Serial.print(receivedData[i], HEX);
            Serial.print(", ");
        }
        Serial.println();
        soil_PH = (int)receivedData[3] * 256 + (int)receivedData[4];
        soil_PH /= 100.0;
        Serial.print("Soil PH = ");
        Serial.println(soil_PH);
        myMQTT.publish("Suchuru/feeds/env.ph", String(soil_PH));
    }
    delay(1000);
    myMQTT.checkConnect();

    Serial.println("Writing to soil temperature and humidity with data...");
    Serial2.write(data485.getDataSOIL_TEMPERATURE_HUMIDITY(), 8);
    delay(1000);
    if (Serial2.available())
    { // If the serial port receives a message.
        uint8_t receivedData[9];
        Serial2.readBytes(receivedData, sizeof(receivedData)); // Read the message.
        for (int i = 0; i < 9; i++)
        {
            Serial.print("0x");
            Serial.print(receivedData[i], HEX);
            Serial.print(", ");
        }
        Serial.println();
        soil_humidity = (int)receivedData[3] * 256 + (int)receivedData[4];
        soil_temperature = (int)receivedData[5] * 256 + (int)receivedData[6];
        soil_humidity /= 10.0;
        soil_temperature /= 10.0;
        Serial.print("Soil humidity: ");
        Serial.println(soil_humidity);
        Serial.print("Soil temperature: ");
        Serial.println(soil_temperature);
        myMQTT.publish("Suchuru/feeds/env.temperature", String(soil_temperature));
        myMQTT.publish("Suchuru/feeds/env.humidity", String(soil_humidity));
    }
    delay(1000);
    myMQTT.checkConnect();

    Serial.println("Writing to soil NPK with data...");
    Serial2.write(data485.getDataSOIL_NPK(), 8);
    delay(1000);
    if (Serial2.available())
    { // If the serial port receives a message.
        uint8_t receivedData[11];
        Serial2.readBytes(receivedData, sizeof(receivedData)); // Read the message.
        for (int i = 0; i < 11; i++)
        {
            Serial.print("0x");
            Serial.print(receivedData[i], HEX);
            Serial.print(", ");
        }
        Serial.println();
        soil_N = (int)receivedData[3] * 256 + (int)receivedData[4];
        soil_P = (int)receivedData[5] * 256 + (int)receivedData[6];
        soil_K = (int)receivedData[7] * 256 + (int)receivedData[8];
        Serial.print("Soil Nito: ");
        Serial.println(soil_N);
        Serial.print("Soil Photpho: ");
        Serial.println(soil_P);
        Serial.print("Soil Kali: ");
        Serial.println(soil_K);

        myMQTT.publish("Suchuru/feeds/env.nitro", String(soil_N));
        myMQTT.publish("Suchuru/feeds/env.phosphorus", String(soil_P));
        myMQTT.publish("Suchuru/feeds/env.kalium", String(soil_K));
    }
    delay(1000);
    myMQTT.checkConnect();

    Serial.println("Writing to soil conductivity with data...");
    Serial2.write(data485.getDataSOIL_CONDUCTIVITY(), 8);
    delay(1000);
    if (Serial2.available())
    { // If the serial port receives a message.
        uint8_t receivedData[7];
        Serial2.readBytes(receivedData, sizeof(receivedData)); // Read the message.
        for (int i = 0; i < 7; i++)
        {
            Serial.print("0x");
            Serial.print(receivedData[i], HEX);
            Serial.print(", ");
        }
        Serial.println();
        soil_EC = (int)receivedData[3] * 256 + (int)receivedData[4];
        Serial.print("Soil EC: ");
        Serial.println(soil_EC);
        myMQTT.publish("Suchuru/feeds/env.ec", String(soil_EC));
    }
    myMQTT.checkConnect();
    Serial.println();
    delay(5000);
    myMQTT.checkConnect();
    M5.update();
}
