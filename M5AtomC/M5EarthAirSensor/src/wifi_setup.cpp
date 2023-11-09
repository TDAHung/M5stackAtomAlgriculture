/*
 * wifi_setup.h
 *
 *  Created on: Oct 12, 2023
 *      Author: Huy Ly
 */
#include "wifi_setup.h"

Wifi_esp32::Wifi_esp32(String ssid = "", String password = "")
{
    // Constructor
    this->ssid = ssid;
    this->password = password;
    Preferences preferences;
    this->preferences = preferences;
}

Wifi_esp32::Wifi_esp32()
{
    // Constructor
    this->ssid = "";
    this->password = "";
    Preferences preferences;
    this->preferences = preferences;
}

void Wifi_esp32::saveWifiCredentials(String ssid, String password)
{
    preferences.begin("credentials", false);
    preferences.putString("ssid", ssid);
    preferences.putString("password", password);
    preferences.end();
}

bool Wifi_esp32::check_savedWifi()
{
    bool result = 0;
    // Kiểm tra xem đã lưu trữ thông tin Wi-Fi trước đó chưa
    if (ssid == "" || password == "")
    {
        preferences.begin("credentials", false);
        ssid = preferences.getString("ssid", "");
        password = preferences.getString("password", "");
    }
    if (ssid == "" || password == "")
    {
        Serial.println("No values saved for ssid or password");
    }
    else
    {
        // Connect to Wi-Fi
        WiFi.begin(ssid.c_str(), password.c_str());
        Serial.print("Connecting to WiFi.");
        int timeout = 10; // Thời gian chờ kết nối (giây)
        while (WiFi.status() != WL_CONNECTED && timeout > 0)
        {
            delay(1000);
            Serial.print(".");
            timeout--;
        }
        Serial.println("");
        if (WiFi.status() == WL_CONNECTED)
            result = 1;
        else
            result = 0;
    }
    return result;
}

void Wifi_esp32::setupSmartConfig()
{
    WiFi.beginSmartConfig();
    Serial.println("Waiting for SmartConfig.");
    // Chờ kết nối Wi-Fi
    while (!WiFi.smartConfigDone())
    {
        delay(1000);
        Serial.print(".");
    }
    Serial.println("");
    Serial.println("SmartConfig done.");
}

void Wifi_esp32::printSuccess()
{
    Serial.println("WiFi connected");
    Serial.print("Local IP:");
    Serial.print(WiFi.localIP());
    Serial.println();
    return;
}

void Wifi_esp32::setupWifi()
{
    Serial.println("");
    // Kiểm tra wifi có lưu chưa
    if (!check_savedWifi())
    {
        // tiến hành SmartConfig
        Serial.println("Cannot connect to saved wifi! Setup smart config...");
        preferences.clear();
        setupSmartConfig();
    }
    // Lưu trữ thông tin Wi-Fi
    ssid = WiFi.SSID().c_str();
    password = WiFi.psk().c_str();
    saveWifiCredentials(ssid, password);
    printSuccess();
}
