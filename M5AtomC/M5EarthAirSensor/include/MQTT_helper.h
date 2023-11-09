/*
 * MQTT_helper.h
 *
 *  Created on: Oct 17, 2023
 *      Author: Huy Ly
 */

#ifndef INC_MQTT_HELPER_H_
#define INC_MQTT_HELPER_H_

#include <PubSubClient.h>
#include <WiFi.h>

class MyMQTT
{
private:
    String mqtt_server;
    String user;
    String password;
    WiFiClient espClient;
    PubSubClient client;

public:
    // Truyền vào server, username, password
    MyMQTT(String server, String user, String password)
        : mqtt_server(server), user(user), password(password), client(espClient)
    {
        client.setBufferSize(2048);
    }

    void connectToMQTT();         // Connect tới server bằng username đã tạo
    void subscribe(String);       // Subscribe đến feed
    bool publish(String, String); // Publish đến feed
    void checkConnect();          // Hàm gọi trong super loop để kiểm tra MQTT

private:
    void callback(char *, byte *, unsigned int); // Hàm dùng khi subscribe đến 1 feed nào đó sẽ tự tạo call back để nhận giá trị
    void reConnect();                            // Hàm bổ trợ cho hàm checkConnect trường hợp không có connect đến server
};

#endif
