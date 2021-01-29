import React, { useState } from 'react';
import {  
  Alert,
  StatusBar,
} from 'react-native';

import {
  Container,
  Display,
  PreviousDisplayScreen,
  CurrentDisplayScreen,
  PreviousValueText,
  CurrentValueText,
  Keyboard,
  DigitButton,
  DigitText,
  OptionsBar,
} from './style';

export default function App(){
  const [previousValue, setPreviousValue] = useState('');
  const [currentValue, setCurrentValue] = useState('');
  const [operator, setOperator] = useState(undefined);

  class Calculator {

    /* constructor(){
      this.dot = false;
    } */

    clear() {
      setPreviousValue('');
      setCurrentValue('');
      this.operator = undefined;
      setOperator(undefined);
      this.dot = false;
    }

    clearCurrent(){
      setCurrentValue('');
    }

    delete(){
      if(currentValue.includes('≅')){
        setCurrentValue(currentValue.substr(1, currentValue.length-2))
      }else if(currentValue === Infinity){
        this.clear();
      }else{
        setCurrentValue(currentValue.substr(0, currentValue.length-1));
      }
    }

    containsApproximatelySymbol(){
      if(currentValue === ''){
        return false;
      }
      const value = currentValue.split('');
      for(let x = 0;x<value.length;x++){
        if(value[x] === '≅'){
          return true;
        }
      }
      return false;
    }

    chooseOperation(_operator) {
      if(currentValue === '' || currentValue === '.'){
        return false;
      }else if(previousValue !== ''){
        return false;
      }else if(this.containsExclamation() || currentValue === Infinity){
        return false;
      }else if(_operator === '!'){
        setCurrentValue(currentValue + _operator);
      }else{
        if(this.containsApproximatelySymbol()){
          const valueWithoutSymbol = currentValue.substr(1, currentValue.length);
          this.operator = _operator;
          setOperator(_operator);
          setPreviousValue(valueWithoutSymbol + ' ' + this.operator);
          setCurrentValue('');
        }else{
          this.operator = _operator;
          setOperator(_operator);
          setPreviousValue(currentValue + ' ' + this.operator);
          setCurrentValue('');
        }
      }
    }

    containsDot() {
      if(currentValue === ''){
        return false;
      }
      const value = currentValue.split('');
      for(let x = 0;x<value.length;x++){
        if(value[x] === '.'){
          return true;
        }
      }
      return false;
    }

    containsExclamation(){
      if(currentValue === ''){
        return false;
      }
      const value = currentValue.split('');
      for(let x = 0;x<=value.length;x++){
        if(value[x]==='!'){
          return true;
        }
      }
      return false;
    }

    addDigit(digit) {
      if(typeof(digit) === "number" && this.containsExclamation()){
        return false;
      }

      if((digit === '.') && (this.containsDot() || this.containsExclamation())){
        return false; 
      }

      if(digit === '!' && (this.containsExclamation() || currentValue === '')){
        return false;
      }

      if(currentValue.length >= 9){
        return false;
      }else{
        setCurrentValue(currentValue + digit.toString());
        
      }
    }

    factorial(num){
      const strValue = num.split('!');
      const numberValue = Number.parseFloat(strValue[0]);

      if(numberValue === 0 || numberValue === 1 ){
        return 1;
      }else{
        let result = numberValue;
        for(let x=1;x<numberValue;x++){
          result *= x;
        }
        return result;
      }
    }

    computeResult() {
      if(currentValue === ''){
        return false;
      }else{
        let previousNumberValue;
        let currentNumberValue;
        if(this.containsExclamation()){
          currentNumberValue = this.factorial(currentValue);
          if(currentNumberValue.toString().length > 9){
            setCurrentValue('≅'+ currentNumberValue.toString().slice(0, 8));
          }else{
            setCurrentValue(currentNumberValue.toString());
          }
        }
        previousNumberValue = Number.parseFloat(previousValue);
        currentNumberValue = Number.parseFloat(currentValue);
        
        let result = '';
        switch (operator){
          case '+':
            this.clear();
            /* setCurrentValue(previousNumberValue + currentNumberValue); */
            result = previousNumberValue + currentNumberValue;
            result = String(result);
            if(result.length > 9){
              setCurrentValue('≅'+ result.slice(0, 8));
            }else{
              setCurrentValue(result);
            }
            break;
          case '-':
            this.clear();
            /* setCurrentValue(previousNumberValue - currentNumberValue); */
            result = previousNumberValue - currentNumberValue;
            result = String(result);
            if(result.length > 9){
              setCurrentValue('≅'+ result.slice(0, 8));
            }else{
              setCurrentValue(result);
            }
            break;
          case '×':
            this.clear();
            /* setCurrentValue(previousNumberValue * currentNumberValue); */
            result = previousNumberValue * currentNumberValue;
            result = String(result);
            if(result.length > 9){
              setCurrentValue('≅'+ result.slice(0, 8));
            }else{
              setCurrentValue(result);
            }
            break;
          case '÷':
            /* setCurrentValue(previousNumberValue / currentNumberValue); */
            if(currentNumberValue === 0){
              Alert.alert("Divisão Impossivel", "Não é possivel dividir um número por 0");
            }else{
              this.clear();
              result = previousNumberValue / currentNumberValue;
              result = String(result);
              if(result.length > 9){
                setCurrentValue('≅'+ result.slice(0, 8));
              }else{
                setCurrentValue(result);
              }
            }
            break;
          case '%':
            this.clear();
            previousNumberValue /= 100;
            result = previousNumberValue * currentNumberValue;
            result = String(result);
            if(result.length > 9){
              setCurrentValue('≅'+ result.slice(0, 8));
            }else{
              setCurrentValue(result);
            }
            break;
        }

      }
      
    }
  }
  
  const calculator = new Calculator();



  return(
    <>
    <StatusBar barStyle="light-content" backgroundColor="#0af"/>
      <Container>
        <Display> 
          <PreviousDisplayScreen>
            <PreviousValueText>
              {previousValue}
            </PreviousValueText>
          </PreviousDisplayScreen>

          <CurrentDisplayScreen>
            <CurrentValueText>
              {currentValue}
            </CurrentValueText>
          </CurrentDisplayScreen>
        </Display>

        <OptionsBar>
          <DigitButton onPress={()=>calculator.delete()} backgroundDigitButton="#000">
            <DigitText digitTextColor="#0af"> ⌫ </DigitText>
          </DigitButton>
        </OptionsBar>

        <Keyboard>

          <DigitButton onPress={()=>calculator.clear()}>
            <DigitText digitTextColor="#f00"> C </DigitText>
          </DigitButton>
          <DigitButton onPress={()=>calculator.clearCurrent()}>
            <DigitText digitTextColor="#0af"> CE </DigitText>
          </DigitButton>
          <DigitButton onPress={()=>calculator.chooseOperation('!')}>
            <DigitText digitTextColor="#0f0"> ! </DigitText>
          </DigitButton>
          <DigitButton onPress={()=>calculator.chooseOperation('%')}>
            <DigitText digitTextColor="#0f0"> % </DigitText>
          </DigitButton>

          <DigitButton onPress={()=>calculator.addDigit(7)}>
            <DigitText digitTextColor="#fff"> 7 </DigitText>
          </DigitButton>
          <DigitButton onPress={()=>calculator.addDigit(8)}>
            <DigitText digitTextColor="#fff"> 8 </DigitText>
          </DigitButton>
          <DigitButton onPress={()=>calculator.addDigit(9)}>
            <DigitText digitTextColor="#fff"> 9 </DigitText>
          </DigitButton>
          <DigitButton onPress={()=>calculator.chooseOperation('÷')}>
            <DigitText digitTextColor="#0f0"> ÷ </DigitText>
          </DigitButton>

          <DigitButton onPress={()=>calculator.addDigit(4)}>
            <DigitText digitTextColor="#fff"> 4 </DigitText>
          </DigitButton>
          <DigitButton onPress={()=>calculator.addDigit(5)}>
            <DigitText digitTextColor="#fff"> 5 </DigitText>
          </DigitButton>
          <DigitButton onPress={()=>calculator.addDigit(6)}>
            <DigitText digitTextColor="#fff"> 6 </DigitText>
          </DigitButton>
          <DigitButton onPress={()=>calculator.chooseOperation('×')}>
            <DigitText digitTextColor="#0f0"> × </DigitText>
          </DigitButton>

          <DigitButton onPress={()=>calculator.addDigit(1)}>
            <DigitText digitTextColor="#fff"> 1 </DigitText>
          </DigitButton>
          <DigitButton onPress={()=>calculator.addDigit(2)}>
            <DigitText digitTextColor="#fff"> 2 </DigitText>
          </DigitButton>
          <DigitButton onPress={()=>calculator.addDigit(3)}>
            <DigitText digitTextColor="#fff"> 3 </DigitText>
          </DigitButton>
          <DigitButton onPress={()=>calculator.chooseOperation('-')}>
            <DigitText digitTextColor="#0f0"> - </DigitText>
          </DigitButton>

          <DigitButton onPress={()=>calculator.addDigit('.')}>
            <DigitText digitTextColor="#ff0"> . </DigitText>
          </DigitButton>
          <DigitButton onPress={()=>calculator.addDigit(0)}>
            <DigitText digitTextColor="#fff"> 0 </DigitText>
          </DigitButton>
          <DigitButton onPress={()=>calculator.computeResult()}>
            <DigitText digitTextColor="#ff0"> = </DigitText>
          </DigitButton>
          <DigitButton onPress={()=>calculator.chooseOperation('+')}>
            <DigitText digitTextColor="#0f0"> + </DigitText>
          </DigitButton>

        </Keyboard>

      </Container>
    </>
  );
}