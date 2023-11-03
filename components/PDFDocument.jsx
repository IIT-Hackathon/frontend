import React from 'react';
import { Page, Text, View, Document, StyleSheet } from '@react-pdf/renderer';

const pageStyle = {
  paddingTop: 16,
  paddingHorizontal: 40,
  paddingBottom: 56
};

const tableStyle = {
  display: "table",
  width: "auto",
  marginTop : 10
};

const tableRowStyle = {
  flexDirection: "row",
  height : 50
};

const firstTableColHeaderStyle = {
  width: "30%",
  borderStyle: "solid",
  borderColor: "#000",
  borderBottomColor: "#000",
  borderWidth: 1,
  backgroundColor: "#bdbdbd"
};

const tableColHeaderStyle = {
  width: "30%",
  borderStyle: "solid",
  borderColor: "#000",
  borderBottomColor: "#000",
  borderWidth: 1,
  borderLeftWidth: 0,
  backgroundColor: "#bdbdbd"
};
const tableColHeaderStyle2 = {
  width: "70%",
  borderStyle: "solid",
  borderColor: "#000",
  borderBottomColor: "#000",
  borderWidth: 1,
  borderLeftWidth: 0,
  backgroundColor: "#bdbdbd"
};

const firstTableColStyle = {
  width: "30%",
  borderStyle: "solid",
  borderColor: "#000",
  borderWidth: 1,
  borderTopWidth: 0
};

const tableColStyle2 = {
  width: "70%",
  borderStyle: "solid",
  borderColor: "#000",
  borderWidth: 1,
  borderLeftWidth: 0,
  borderTopWidth: 0
};

const tableCellHeaderStyle = {
  textAlign: "center",
  margin: 4,
  fontSize: 12,
  fontWeight: "bold"
};

const tableCellStyle = {
  textAlign: "center",
  margin: 5,
  fontSize: 10
};

const createTableHeader = () => {
  return (
    <View style={tableRowStyle} fixed>

      <View style={firstTableColHeaderStyle}>
        <Text style={tableCellHeaderStyle}>Medicine Name</Text>
      </View>

      <View style={tableColHeaderStyle2}>
        <Text style={tableCellHeaderStyle}>Instruction</Text>
      </View>

    </View>
  );
};

const createTableRow = (medicine) => {
  return (
    <View style={tableRowStyle}>

      <View style={firstTableColStyle}>
        <Text style={tableCellStyle}>{medicine.medicineName}</Text>
      </View>

      <View style={tableColStyle2}>
        <Text style={tableCellStyle}>{medicine.rule}</Text>
      </View>

    </View>
  );
};

function PdfDocument({ prescription }) {
  console.log(prescription[2])
  return (
    <Document>
      <Page
        style={pageStyle}
        size="A4"
        orientation="portrait">
        <View>
          <Text style={{ fontSize : 12, color : "#333" }}>Dr. {prescription[2].doctor.firstName} {prescription[2].doctor.lastName}</Text>
        </View>
        <View>
          <Text style={{ fontSize : 12, color : "#333" }}>{prescription[2].doctor.degrees}</Text>
        </View>
        <View style={{ marginBottom : 30, fontSize : 12, color : "#333"}}>
          <Text>{prescription[2].doctor.currentHospital}</Text>
        </View>
        <View style={{ marginVertical : 5, fontSize : 12, color : "#333"}}>
          <Text>---------------------------------------------------------------------------------------------------------------------------------</Text>
        </View>
        <View style={tableStyle}>
          {createTableHeader()}
          {
            prescription[0].medicine.map(medicine => createTableRow(medicine))
          }
        </View>
        <View style={{ marginTop : 30 }}>
          <Text style={{ fontSize : 14 }}>Special Instructions : {prescription[1].instruction}</Text>
        </View>
      </Page>
    </Document>
  );
}

export default PdfDocument;