import { TouchableOpacity, Text, StyleSheet } from "react-native";

interface ButtonProps {
    styleButton: any,
    onClick: () => void,
    title: String,
}

const Button: React.FC<ButtonProps> = ({styleButton, onClick, title}) => (
    <TouchableOpacity onPress={onClick} style={[styles.wrapper, styleButton]}>
        <Text style={[styles.textButton]}>{title}</Text>
    </TouchableOpacity>
)

const styles = StyleSheet.create({
    wrapper: {
        backgroundColor: "#1C9FF0",
        height: 40,
        borderRadius: 15,
        justifyContent: "center",
        alignItems: "center",
        width: "100%",
        marginTop: 10,
    },
    textButton: {
        color: "white",
        fontWeight: "bold",
        fontSize: 17,
    },
});

export default Button;