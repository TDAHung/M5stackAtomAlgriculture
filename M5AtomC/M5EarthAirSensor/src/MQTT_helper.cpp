/*
 * MQTT_helper.cpp
 *
 *  Created on: Oct 17, 2023
 *      Author: Huy Ly
 */

#include "MQTT_helper.h"

void MyMQTT::connectToMQTT()
{
    client.setServer(mqtt_server.c_str(), 1883);
    reConnect();
    client.setCallback([this](char *topic, byte *payload, unsigned int length)
                       { this->callback(topic, payload, length); });
}

void MyMQTT::subscribe(String feedName)
{
#ifdef ADAFRUIT
    String topic = user + "/feeds/" + feedName;
#endif
    String topic = feedName;
    client.subscribe(topic.c_str());
}

bool MyMQTT::publish(String feedName, String message)
{
#ifdef ADAFRUIT
    String topic = user + "/feeds/" + feedName;
#endif
    String topic = feedName;
    Serial.print("Publishing to topic: ");
    Serial.println(feedName);
    Serial.println("Message: ");
    Serial.println(message.c_str());
    Serial.print("Status: ");
    if (client.publish(topic.c_str(), message.c_str(), 1))
    {
        Serial.println("Success!");
        return 1;
    }
    Serial.println("Failed!");
    return 0;
}

void MyMQTT::checkConnect()
{
    if (!client.connected())
    {
        Serial.println("MQTT Connection lost!");
        reConnect();
    }
    client.loop();
}

void MyMQTT::callback(char *topic, byte *payload, unsigned int length)
{
    // Your callback implementation here
    Serial.print("Message arrived [");
    Serial.print(topic);
    Serial.print("] ");
    for (int i = 0; i < length; i++)
    {
        Serial.print((char)payload[i]);
    }
    Serial.println();
}

void MyMQTT::reConnect()
{
    while (!client.connected())
    {
        Serial.print("Attempting MQTT connection...");
        if (client.connect("ESP32Client", user.c_str(), password.c_str()))
        {
            Serial.println("connected");
        }
        else
        {
            Serial.print("failed, rc=");
            Serial.print(client.state());
            Serial.println(" try again in 5 seconds");
            delay(5000);
        }
    }
}
