import React, { useState } from 'react';

export function getFormattedDate(date) {
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const day = String(date.getDate()).padStart(2, '0');
    const formattedDate = `${year}-${month}-${day}`;
    return formattedDate
}

export function returnTime(time) {
    let hour = parseInt(time)
    let minute = Math.ceil((time - hour) * 100) 
    if(time > 12) return `${hour - 12 == 0 ? hour : hour - 12} : ${minute == 0 ? "00" : minute} PM`
    return `${hour} : ${minute == 0 ? "00" : minute} AM`
}

export function formatMonthDate(dateString) {
    const date = new Date(dateString);
    const month = date.getMonth() + 1; 
    const day = date.getDate();
    const formattedDate = `${month}/${day}`;
    return formattedDate
}

export async function sendSMS(phoneNumber, message) {
    const api_key = 'huCqtTC4s44wPSkNKI0b'
    const url = ` http://bulksmsbd.net/api/smsapi?api_key=${api_key}&type=text&number=${phoneNumber}&senderid=8809617613117&message=${message}`
    try {
      const requestOptions = {
        method: 'POST',
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded',
        },
      };
      const response = await fetch(url, requestOptions);
      const data = await response.json();
      return data
    } catch (error) {
      console.error('Error sending SMS:', error);
      return 'Error sending SMS'
    }
};