import { Text, View, Font } from '@react-pdf/renderer';
import React from 'react';
import turkishbold from '../pdfComponents/extrabold.ttf';
Font.register({ family: 'Turkishbold', src: turkishbold });

const Signs = ({ data }) => {
  const info = {
    studentName: data.student.name,
    studentLastName: data.student.last_name,
  };
  return (
    <View style={styles.container2}>
      <View style={styles.box}>
        <View>
          <Text style={{ fontFamily: 'Turkishbold', fontSize: '10px' }}>Öğrenci İmzası</Text>{' '}
        </View>
        <View style={styles.text}>
          <Text> Adi Soyadi</Text>
          <Text>:.............</Text>
        </View>
        <View style={styles.text}>
          <Text>Tarih</Text>
          <Text>:.............</Text>
        </View>
      </View>
      <View style={styles.box}>
        <View>
          {' '}
          <Text style={{ fontFamily: 'Turkishbold', fontSize: '10px' }}>Fakülte Komisyon Onayı</Text>{' '}
        </View>
        <View style={styles.text}>
          <Text> Onaylayan</Text>
          <Text>:.............</Text>
        </View>
        <View style={styles.text}>
          <Text>Tarih</Text>
          <Text>:.............</Text>
        </View>
      </View>
      <View style={styles.box}>
        <View>
          {' '}
          <Text style={{ fontFamily: 'Turkishbold', fontSize: '10px' }}> Fakülte / Yükselokul / MYO </Text>{' '}
        </View>
        <View style={styles.text}>
          <Text> Onaylayan</Text>
          <Text>:.............</Text>
        </View>

        <View style={styles.text}>
          <Text>Tarih</Text>
          <Text>:.............</Text>
        </View>
      </View>
    </View>
  );
};

const styles = {
  text: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  container2: {
    width: '100%',
    display: 'flex',
    flexDirection: 'row',
    height: '50px',
    margin: '2px 0px',
  },
  box: {
    height: '100%',
    display: 'flex',
    flexDirection: 'column',
    border: '1px solid black',
    padding: '5px 15px',
    justifyContent: 'space-evenly',

    flex: 1,
  },
};
export default Signs;
