int potPin = A0;
int potReading = 0;     //hold pot reading

int ledPin = D1;
int ledBrightness = 0;  //hold led brightness

int buttonPin = D5;
int buttonPressed = 0;
bool ready = true;
int last;

bool isPlaying = false;
int musicLevel = 0;

char name[10];

void playHandler(const char *event, const char *data) {
    Serial.println("Play handler. Data: " + String(data));
    if (strcmp(data, name) == 0) {
        Serial.println("This device is now playing");
        isPlaying = true;
    } else {
        Serial.println("This device is not playing");
        isPlaying = false;  
    }
}

void nameHandler(const char *event, const char *data) {
    Serial.println("device name:" + String(data));
    strcpy(name, data);
}

void setup(){
    Serial.begin(115200);

    pinMode(ledPin, OUTPUT);
    pinMode(buttonPin, INPUT);

    Particle.subscribe("play", playHandler);
    Particle.subscribe("spark/device/name", nameHandler);
    Particle.publish("spark/device/name");
}

void loop() {
    if (millis() - last > 200 && digitalRead(buttonPin)) {
        if (ready) {
            ready = false;
            Particle.publish("play", name);
        } else {
            ready = true;
        }
    }

    if (isPlaying) {
        potReading = analogRead(potPin);                      //use analogRead to get pot reading, a value from 0 to 4095

        ledBrightness = map(potReading, 0, 4095, 0, 255);     //map to led brightness (0 - 255)
        musicLevel = map(potReading, 0, 4095, 0, 100);        //map to volume level (0 - 100)

        Particle.publish("volumeChange", musicLevel);

        analogWrite(ledPin, ledBrightness);                   //use analog write to set LED brightness
    } else {
        analogWrite(ledPin, 0);                               //turn off LED
    }

    delay(100);                                           //wait 1/10th of a second before next loop
}
