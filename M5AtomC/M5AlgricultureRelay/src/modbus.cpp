#include "modbus.h"

MODBUS_CABINET::MODBUS_CABINET()
{
    // solution 1
    data_relay_1_on = new uint8_t[8]{0x01, 0x06, 0x00, 0x00, 0x00, 0xff, 0xc9, 0x8a};
    data_relay_1_off = new uint8_t[8]{0x01, 0x06, 0x00, 0x00, 0x00, 0x00, 0x89, 0xca};

    // solution 2
    data_relay_2_on = new uint8_t[8]{0x02, 0x06, 0x00, 0x00, 0x00, 0xff, 0xc9, 0xb9};
    data_relay_2_off = new uint8_t[8]{0x02, 0x06, 0x00, 0x00, 0x00, 0x00, 0x89, 0xf9};

    // solution 3
    data_relay_3_on = new uint8_t[8]{0x03, 0x06, 0x00, 0x00, 0x00, 0xff, 0xc8, 0x68};
    data_relay_3_off = new uint8_t[8]{0x03, 0x06, 0x00, 0x00, 0x00, 000, 0x88, 0x28};

    // subdivision 1
    data_relay_4_on = new uint8_t[8]{0x04, 0x06, 0x00, 0x00, 0x00, 0xff, 0xc9, 0xdf};
    data_relay_4_off = new uint8_t[8]{0x04, 0x06, 0x00, 0x00, 0x00, 00, 0x89, 0x9f};

    // subdivision 2
    data_relay_5_on = new uint8_t[8]{0x05, 0x06, 0x00, 0x00, 0x00, 0xff, 0xc8, 0x0e};
    data_relay_5_off = new uint8_t[8]{0x05, 0x06, 0x00, 0x00, 0x00, 0x00, 0x88, 0x4e};

    // subdivision 3
    data_relay_6_on = new uint8_t[8]{0x06, 0x06, 0x00, 0x00, 0x00, 0xff, 0xc8, 0x3d};
    data_relay_6_off = new uint8_t[8]{0x06, 0x06, 0x00, 0x00, 0x00, 0x00, 0x88, 0x7d};

    // pump in
    data_relay_7_on = new uint8_t[8]{0x07, 0x06, 0x00, 0x00, 0x00, 0xff, 0xc9, 0xec};
    data_relay_7_off = new uint8_t[8]{0x07, 0x06, 0x00, 0x00, 0x00, 0x00, 0x89, 0xac};

    // pump out
    data_relay_8_on = new uint8_t[8]{0x08, 0x06, 0x00, 0x00, 0x00, 0xff, 0xc9, 0x13};
    data_relay_8_off = new uint8_t[8]{0x08, 0x06, 0x00, 0x00, 0x00, 0x00, 0x89, 0x53};
}

MODBUS_CABINET::~MODBUS_CABINET()
{
    delete[] this->data_relay_1_on;
    delete[] this->data_relay_1_off;
    delete[] this->data_relay_2_on;
    delete[] this->data_relay_2_off;
    delete[] this->data_relay_3_on;
    delete[] this->data_relay_3_off;
    delete[] this->data_relay_4_on;
    delete[] this->data_relay_4_off;
    delete[] this->data_relay_5_on;
    delete[] this->data_relay_5_off;
    delete[] this->data_relay_6_on;
    delete[] this->data_relay_6_off;
    delete[] this->data_relay_7_on;
    delete[] this->data_relay_7_off;
    delete[] this->data_relay_8_on;
    delete[] this->data_relay_8_off;
}

uint8_t *MODBUS_CABINET::getDataRelay1ON()
{
    return this->data_relay_1_on;
}

uint8_t *MODBUS_CABINET::getDataRelay1OFF()
{
    return this->data_relay_1_off;
}

uint8_t *MODBUS_CABINET::getDataRelay2ON()
{
    return this->data_relay_2_on;
}

uint8_t *MODBUS_CABINET::getDataRelay2OFF()
{
    return this->data_relay_2_off;
}

uint8_t *MODBUS_CABINET::getDataRelay3ON()
{
    return this->data_relay_3_on;
}

uint8_t *MODBUS_CABINET::getDataRelay3OFF()
{
    return this->data_relay_3_off;
}

uint8_t *MODBUS_CABINET::getDataRelay4ON()
{
    return this->data_relay_4_on;
}

uint8_t *MODBUS_CABINET::getDataRelay4OFF()
{
    return this->data_relay_4_off;
}

uint8_t *MODBUS_CABINET::getDataRelay5ON()
{
    return this->data_relay_5_on;
}

uint8_t *MODBUS_CABINET::getDataRelay5OFF()
{
    return this->data_relay_5_off;
}

uint8_t *MODBUS_CABINET::getDataRelay6ON()
{
    return this->data_relay_6_on;
}

uint8_t *MODBUS_CABINET::getDataRelay6OFF()
{
    return this->data_relay_6_off;
}

uint8_t *MODBUS_CABINET::getDataRelay7ON()
{
    return this->data_relay_7_on;
}

uint8_t *MODBUS_CABINET::getDataRelay7OFF()
{
    return this->data_relay_7_off;
}

uint8_t *MODBUS_CABINET::getDataRelay8ON()
{
    return this->data_relay_8_on;
}

uint8_t *MODBUS_CABINET::getDataRelay8OFF()
{
    return this->data_relay_8_off;
}
