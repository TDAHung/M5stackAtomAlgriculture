from m5stack import *
from m5stack_ui import *
from uiflow import *
from m5mqtt import M5mqtt
import unit


screen = M5Screen()
screen.clean_screen()
screen.set_screen_bg_color(0xFFFFFF)
pir_0 = unit.get(unit.PIR, unit.PORTA)


Motion = None

label0 = M5Label('label0', x=106, y=106, color=0x000, font=FONT_MONT_14, parent=None)

def fun_Suchuru___Feeds___motion_(topic_data):
  global Motion
  Motion = topic_data
  pass

m5mqtt = M5mqtt('Suchuru', 'io.adafruit.com', 1883, 'Suchuru', 'aio_cmCs45siSLdSzPWV13DOdtYVQMzo', 300)
m5mqtt.subscribe(str('Suchuru / Feeds / motion'), fun_Suchuru___Feeds___motion_)
m5mqtt.start()
Motion = 'Not Detected'
while True:
  if (pir_0.state) == 1:
    Motion = 'Detected'
  else:
    Motion = 'Not Detected'
  label0.set_text(str(Motion))
  wait_ms(2)
