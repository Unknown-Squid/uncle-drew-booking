import { ipAddress } from "../Constant/ipAddress";

const AddBooking = async ( 
    receipt_number,
    reference_number,
    name,
    email,
    phone_number,
    event_type,
    message_request,
    booking_type,
    booking_date,
    booking_time,
    booking_duration,
    sports_center_settings,
    score_board_shot_clock_operator,
    ball,
    speaker_mic,
    total,
    total2,
    payment_preference,
    credit_card,
    payment_method,
    downpayment,
    status
) => {
    try {
        const response = await fetch(`${ipAddress}/add-booking-data`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({ 
                receipt_number,
                reference_number,
                name,
                email,
                phone_number,
                event_type,
                message_request,
                booking_type,
                booking_date,
                booking_time,
                booking_duration,
                sports_center_settings,
                score_board_shot_clock_operator,
                ball,
                speaker_mic,
                total,
                total2,
                payment_preference,
                credit_card,
                payment_method,
                downpayment,
                status
            }),
        });

        if (response.ok) {
            const data = await response.json();
            return data
        } else {
            console.error("Error:", response.statusText);
        }
    } catch (error) {
        console.error("Error:", error);
    }
};

const GetBooking = async () => {
    try {
      const response = await fetch(`${ipAddress}/get-all-booking-data`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      });
  
      if (response.ok) {
        const data = await response.json(); 
        return data;
      } else {
        console.error("❌ Server responded with:", response.status, response.statusText);
      }
    } catch (error) {
      console.error("🔥 Fetch error:", error);
    }
};
  

const GetBookingByKey = async (key, value) => {
    try {
      const response = await fetch(`${ipAddress}/get-booking-data-by-key?key=${encodeURIComponent(key)}&&value=${encodeURIComponent(value)}`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      });
  
      if (response.ok) {
        const data = await response.json(); 
        return data;
      } else {
        console.error("❌ Server responded with:", response.status, response.statusText);
      }
    } catch (error) {
      console.error("🔥 Fetch error:", error);
    }
};


const GetBookingByMonth = async (month) => {
    try {
      const response = await fetch(`${ipAddress}/get-booking-data-by-month?month=${encodeURIComponent(month)}`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      });
  
      if (response.ok) {
        const data = await response.json(); 
        return data;
      } else {
        console.error("❌ Server responded with:", response.status, response.statusText);
      }
    } catch (error) {
      console.error("🔥 Fetch error:", error);
    }
};
  

const UpdateBookingStatus = async (bookingData) => {
    try {
      const response = await fetch(`${ipAddress}/update-booking-data-status`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(bookingData),
      });
  
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
  
      return await response.json();
    } catch (error) {
      console.error("Error updating booking Status:", error);
    }
};

const UpdateUserBookingData = async (bookingData) => {
    try {
      const response = await fetch(`${ipAddress}/update-user-booking-data`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(bookingData),
      });
  
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
  
      return await response.json();
    } catch (error) {
      console.error("Error updating booking Status:", error);
    }
};

export {
    AddBooking,
    GetBooking,
    GetBookingByKey,
    GetBookingByMonth,
    UpdateBookingStatus,
    UpdateUserBookingData
}