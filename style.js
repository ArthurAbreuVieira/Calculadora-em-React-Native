import styled from 'styled-components/native';

export const Container = styled.SafeAreaView`
    background-color: #000000;
    flex:1;
    /* padding:5px; */
`;

export const Display = styled.View`
    flex:1;
    /* flex-direction:column; */
`;

export const CurrentDisplayScreen = styled.View`
    background-color:#000;
    width:100%;
    height:108px;
    max-height:108px;
    flex-direction:row;
    justify-content:flex-end;
    align-items:center;
    padding-right:10px;
`;

export const PreviousDisplayScreen = styled.View`
    background-color:#000;
    width:100%;
    height:88px;
    max-height:88px;
    flex-direction:row;
    justify-content:flex-end;
    align-items:center;
    padding-right:10px;
`;

export const CurrentValueText = styled.Text`
    font-weight:100;
    font-size:63px;
    color:#E0FFFF;
`;

export const PreviousValueText = styled.Text`
    font-weight:100;
    font-size:30px;
    color:#fff;
`;

export const Keyboard = styled.View`
    flex-direction:row;
    flex-wrap:wrap;
`;

export const DigitButton = styled.TouchableHighlight`
    background-color:${ props => props.backgroundDigitButton?props.backgroundDigitButton:"#242424"};
    width: 25%/* 20% */;
    height: 70px;
    justify-content:center;
    align-items:center;
    border-radius:15px;
    border-width:1px;
    border-color:#000;
`;

export const DigitText = styled.Text`
    color: ${ props => props.digitTextColor?props.digitTextColor:"#fff"};
    font-weight:100;
    font-size: 36px;
`;

export const OptionsBar = styled.View`
    background-color:#000;
    border:1px;
    border-top-color:lightblue;
    border-bottom-color:lightblue;
    flex-direction:row;
    justify-content:flex-end;
`;