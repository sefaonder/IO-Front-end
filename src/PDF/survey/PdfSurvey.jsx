import React from 'react';
import { Document, Font, Page, Text, View, StyleSheet } from '@react-pdf/renderer';
import PdfTable from '../pdfComponents/PdfTable';
import PdfHeader from '../pdfComponents/PdfHeader';
import CollectiveQuestions from '../pdfComponents/CollectiveQuestions';
import turkishbold from '../pdfComponents/extrabold.ttf';
import turkishregular from '../pdfComponents/semibold.ttf';
import PdfCheckbox from '../pdfComponents/PdfCheckbox';

Font.register({ family: 'Turkish', src: turkishregular });
Font.register({ family: 'Turkishbold', src: turkishbold });
const PdfSurvey = ({ data }) => {
  if (!data) {
    return 'asd';
  }
  const headerText = [
    'T.C. ULUDAĞ ÜNİVERSİTESİ MÜHENDİSLİK FAKÜLTESİ',
    'BİLGİSAYAR MÜHENDİSLİĞİ BÖLÜMÜ',
    'STAJ DEĞERLENDİRME ANKET FORMU',
  ];
  console.log(data);
  const gaps = ['1.79 ve altı', '1.80 - 1.99', '2.00 - 2.49', '2.50 - 2.99', '3.00 - 3.49', '3.50 - 4.00'];
  return (
    <Document>
      <Page style={styles.page} size="A4">
        <View style={styles.viewContainer}>
          <PdfHeader headerText={headerText} />
          <View style={styles.descContainer}>
            <Text style={{ fontSize: '11px', marginBottom: '12px', fontFamily: 'Turkishbold' }}>
              (Öğrenci tarafından staj sonunda doldurulacak ve staj defteri ile beraber teslim edilecektir.)
            </Text>
            <View style={styles.description}>
              <Text>Sevgili Öğrenciler,</Text>
              <Text style={{}}>
                Bu anketin amacı eğitimin niteliğini sürekli ve sistemli bir biçimde geliştirmek için görüşlerinizden
                yararlanmaktır. Yaptığınız stajı aşağıdaki ölçütlere göre değerlendirmeniz istenmektedir.
                Değerlendirmenizin kendi kişisel gözlem ve algılarınıza dayanıyor olması bu verilerin geçerliliği ve
                güvenilirliği açısından çok önemlidir. Buradaki sorulara verdiğiniz cevaplar stajınızın
                değerlendirilmesi esnasında dikkate alınmayacaktır. Bu nedenle değerlendirmeniz esnasında lütfen
                duygusal olmayınız ve arkadaşlarınızla aranızda fikir alışverişinde bulunmayınız.
              </Text>
              <Text>Katkılarınız için şimdiden teşekkür ederiz.</Text>
            </View>
          </View>
          <View style={styles.view}>
            <Text
              style={{
                marginBottom: 5,
                textAlign: 'right', // Metni sağa yaslamak için
                fontFamily: 'Turkishbold',
                width: '100%',
              }}
            >
              Bilgisayar Mühendisliği Bölümü Staj Komisyonu
            </Text>

            <View style={{ display: 'flex', flexDirection: 'column', gap: '10px', width: '100%' }}>
              <View style={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between', width: '100%' }}>
                <Text style={{ fontFamily: 'Turkishbold' }}>Staj Yapılan Firma Adı:</Text>
                <Text> {data?.company_name} </Text>
              </View>
              <View style={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between', width: '100%' }}>
                <Text style={{ fontFamily: 'Turkishbold' }}>Staj Yapılan Firma Adresi: </Text>
                <Text> {data?.company_address} </Text>
              </View>
            </View>

            <Text style={styles.subTitle}> Staj Yapan Ögrencinin:</Text>
            <View style={styles.optionsContainer}>
              <View style={styles.rowContainer}>
                <View style={styles.options}>
                  <Text style={{ fontFamily: 'Turkishbold' }}>Öğretim Türü:</Text>
                  {['1. Öğretim', '2. Öğretim'].map((item, index) => (
                    <View style={styles.checkboxItem}>
                      <PdfCheckbox text={item} checked={item === data?.teach_type} />
                    </View>
                  ))}
                </View>
                <View style={styles.options}>
                  <Text style={{ fontFamily: 'Turkishbold' }}>Staj Grubu:</Text>
                  {['I. Grup', 'II. Grup'].map((item, index) => (
                    <View style={styles.checkboxItem}>
                      <PdfCheckbox text={item} checked={item === data?.intern_group} />
                    </View>
                  ))}
                </View>
              </View>
              <View style={styles.rowContainer}>
                <View style={styles.options}>
                  <Text style={{ fontFamily: 'Turkishbold', height: '100%' }}>GANO:</Text>

                  <View
                    style={{
                      width: '80%',
                      display: 'flex',
                      flexWrap: 'wrap',
                      flexDirection: 'row',
                      justifyContent: 'flex-end',
                    }}
                  >
                    {gaps.map((item, index) => (
                      <View style={styles.checkboxItem}>
                        <PdfCheckbox text={item} checked={item === data?.gano} />
                      </View>
                    ))}
                  </View>
                </View>
                <View
                  style={{
                    width: '100%',
                    display: 'flex',
                    flexDirection: 'column',
                    height: '100%',
                    justifyContent: 'space-between',
                  }}
                >
                  <View style={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between' }}>
                    <Text style={{ fontFamily: 'Turkishbold' }}>Staj Türü:</Text>

                    {['Dönem Dışı', 'Dönem içi'].map((item, index) => (
                      <View style={styles.checkboxItem}>
                        <PdfCheckbox text={item} checked={item === data?.intern_type} />
                      </View>
                    ))}
                  </View>
                  <View
                    style={{
                      fontFamily: 'Turkishbold',
                      display: 'flex',
                      flexDirection: 'row',
                      justifyContent: 'space-between',
                    }}
                  >
                    <Text>Tarih:</Text>
                    <Text>{new Date(data?.date).toLocaleDateString('tr-TR')}</Text>
                  </View>
                </View>
              </View>
            </View>
            <Text style={{ marginTop: 8 }}> Anket Soruları: </Text>
            <CollectiveQuestions data={data} />
          </View>
        </View>
      </Page>
    </Document>
  );
};

const styles = StyleSheet.create({
  page: {
    fontFamily: 'Turkish',
    paddingTop: 25, // Yeni sayfa başlangıcında padding ekleyin
    paddingBottom: 25,
    paddingHorizontal: 30,
  },
  descContainer: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: '10px', // Sayfa geçişlerinde alt padding ekleyin
  },
  description: {
    marginBottom: 5,
    fontSize: 12,
    width: '90%',
    display: 'flex',
  },
  viewContainer: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    width: '100%',
  },
  subTitle: {
    fontSize: 12,
    margin: '10px 0px',
    paddingBottom: 1,
    width: '100%',
    fontFamily: 'Turkishbold',
    textDecoration: 'underline',
  },
  view: {
    width: '90%',
    display: 'flex',
    fontSize: 12,
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'column',
  },
  optionsContainer: {
    width: '100%',
    display: 'flex',
    flexDirection: 'column',

    gap: '20px',
  },
  options: {
    width: '100%',
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    flexWrap: 'wrap',
    alignItems: 'center',
  },
  rowContainer: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
    gap: '20px',
  },
});

export default PdfSurvey;
