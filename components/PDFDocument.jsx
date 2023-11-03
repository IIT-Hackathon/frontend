import React, { useEffect, useState } from "react";
import { Page, Text, View, Document, StyleSheet } from "@react-pdf/renderer";
import { Key } from "lucide-react";

const pageStyle = {
  paddingTop: 16,
  paddingHorizontal: 40,
  paddingBottom: 56,
};

const tableStyle = {
  display: "table",
  width: "auto",
  marginTop: 10,
};

const tableRowStyle = {
  flexDirection: "row",
  height: 50,
};

const tableColHeaderStyle2 = {
  width: "70%",
  borderStyle: "solid",
  borderColor: "#000",
  borderBottomColor: "#000",
  borderWidth: 1,
  backgroundColor: "#bdbdbd",
};

const tableColStyle2 = {
  width: "70%",
  borderStyle: "solid",
  borderColor: "#000",
  borderWidth: 1,
  borderTopWidth: 0,
};

const tableCellHeaderStyle = {
  textAlign: "center",
  margin: 4,
  fontSize: 12,
  fontWeight: "bold",
};

const tableCellStyle = {
  textAlign: "center",
  margin: 5,
  fontSize: 10,
};

const headers = [];
const getHeaders = (input) => {
  headers.length = 0; // Clear the array before adding new headers

  if (input.hasOwnProperty("year")) {
    headers.push({ key: "year", value: "Year" });
  }
  if (input.hasOwnProperty("income")) {
    headers.push({ key: "income", value: "Income" });
  }
  if (input.hasOwnProperty("taxable_income")) {
    headers.push({ key: "taxable_income", value: "Taxable Income" });
  }
  if (input.hasOwnProperty("tax")) {
    headers.push({ key: "tax", value: "Net Payable Tax" });
  }
  if (input.hasOwnProperty("city")) {
    headers.push({ key: "city", value: "City" });
  }
};

const createTableHeader = (record) => {
  return (
    <View style={tableRowStyle} fixed>
      {record.map((item, index) => {
        return (
          <View key={index} style={tableColHeaderStyle2}>
            <Text style={tableCellHeaderStyle}>{item.value}</Text>
          </View>
        );
      })}
    </View>
  );
};

const createTableRow = (record, input) => {
  return (
    <View style={tableRowStyle}>
      {record.map((item, index) => {
        return (
          <View key={index} style={tableColStyle2}>
            <Text style={tableCellStyle}>{input[item.key]}</Text>
          </View>
        );
      })}
    </View>
  );
};

function PdfDocument({ input }) {
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    getHeaders(input);
    console.log(headers);
    setLoading(false);
  }, []);
  const breakdown = JSON.parse(input.breakdown);
  return (
    <Document>
      <Page style={pageStyle} size="A4" orientation="portrait">
        <View>
          <Text style={{ fontSize: 24, color: "#333", textAlign: "center" }}>
            Yearly Tax Report of {input.year}
          </Text>
        </View>

        <View style={{ marginVertical: 5, fontSize: 12, color: "#333" }}>
          <Text>
            ---------------------------------------------------------------------------------------------------------------------------------
          </Text>
        </View>
        <View
          style={{
            marginTop: 15,
            marginBottom: 5,
            fontSize: 12,
            color: "#333",
            textAlign: "center",
          }}
        >
          <Text>Tax Report of {input.year}</Text>
        </View>
        {!loading && (
          <View style={tableStyle}>
            {createTableHeader(headers)}
            {createTableRow(headers, input)}
          </View>
        )}

        <View
          style={{
            marginTop: 15,
            marginBottom: 5,
            fontSize: 12,
            color: "#333",
            textAlign: "center",
          }}
        >
          <Text>Net Payable Tax Breakdown</Text>
        </View>
        {/* <View style={{ marginTop: 30 }}>
<Text style={{ fontSize: 14 }}>
Special Instructions : {prescription[1].instruction}
</Text>
</View> */}
        {breakdown.map((item, index) => {
          return (
            <View
              style={{
                width: "100%",
                display: "flex",
                flexDirection: "row",
                justifyContent: "space-between",
                fontSize: 12,
                paddingLeft: 10,
                paddingRight: 10,
              }}
            >
              <Text style={{ marginBottom: 2 }}>{item.message}</Text>
              <Text style={{ marginBottom: 2 }}>{item.amount}</Text>
            </View>
          );
        })}
      </Page>
    </Document>
  );
}

export default PdfDocument;
