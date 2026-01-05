import React, { useState } from "react";
import { View, ScrollView } from "react-native";
import { Card, Text, TextInput, Button, SegmentedButtons, Snackbar } from "react-native-paper";
import { styles } from "./styles";
import { useAuthLogic } from "./logic";
import { StackNavigationProp } from "@react-navigation/stack";
import { useNavigation } from "@react-navigation/native";
import { RootStackParamList } from "@/src/navigation/types";


interface AuthScreenProps {
  initialTab?: "login" | "signup";
}

export default function AuthScreen({ initialTab = "login" }: AuthScreenProps) {
  const [tab, setTab] = useState<"login" | "signup">(initialTab);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");

  const navigation = useNavigation<StackNavigationProp<RootStackParamList>>();
  const { isLoading, snackbar, setSnackbar, handleLogin, handleSignup } = useAuthLogic(navigation);


  return (
    <ScrollView contentContainerStyle={styles.contentContainerStyle}>
      <Card style={styles.card}>
        <View style={{ alignItems: "center", marginBottom: 16 }}>
          <View style={styles.logoContainer}>
            <Text style={{ color: "white", fontWeight: "bold", fontSize: 24 }}>🚚</Text>
          </View>
          <Text style={styles.title}>Sweetrip</Text>
          <Text style={styles.description}>Fleet management made simple</Text>
        </View>

        <SegmentedButtons
          value={tab}
          onValueChange={setTab}
          buttons={[
            { value: "login", label: "Login" },
            { value: "signup", label: "Sign Up" },
          ]}
          style={{ marginBottom: 16 }}
        />

        <View style={{ width: "100%" }}>
          {tab === "login" ? (
            <View>
              <TextInput
                label="Email"
                value={email}
                onChangeText={setEmail}
                style={styles.input}
                keyboardType="email-address"
                autoCapitalize="none"
              />
              <TextInput
                label="Password"
                value={password}
                onChangeText={setPassword}
                style={styles.input}
                secureTextEntry
              />
              <Button
                mode="contained"
                onPress={() => handleLogin(email, password)}
                loading={isLoading}
                style={styles.button}
              >
                {isLoading ? "Logging in..." : "Login"}
              </Button>
            </View>
          ) : (
            <View>
              <TextInput
                label="Full Name"
                value={name}
                onChangeText={setName}
                style={styles.input}
              />
              <TextInput
                label="Email"
                value={email}
                onChangeText={setEmail}
                style={styles.input}
                keyboardType="email-address"
                autoCapitalize="none"
              />
              <TextInput
                label="Password"
                value={password}
                onChangeText={setPassword}
                style={styles.input}
                secureTextEntry
              />
              <Button
                mode="contained"
                onPress={() => handleSignup(name, email, password)}
                loading={isLoading}
                style={styles.button}
              >
                {isLoading ? "Creating account..." : "Create Account"}
              </Button>
            </View>
          )}
        </View>
      </Card>

      <Snackbar
        visible={snackbar.visible}
        onDismiss={() => setSnackbar({ ...snackbar, visible: false })}
        duration={3000}
      >
        {snackbar.message}
      </Snackbar>
    </ScrollView>
  );
}
