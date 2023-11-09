#ifndef INC_WIFI_SETUP_H_
#define INC_WIFI_SETUP_H_

#include <WiFi.h>
#include <EEPROM.h>
#include <Preferences.h>

class Wifi_esp32
{
private:
  Preferences preferences;
  String ssid;
  String password;

private:
  void saveWifiCredentials(String, String);
  bool check_savedWifi();
  void setupSmartConfig();
  void printSuccess();

public:
  Wifi_esp32();
  Wifi_esp32(String, String);
  void setupWifi();
};
#endif
