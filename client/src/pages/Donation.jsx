import React, { useEffect, useState, useCallback } from "react";
import API from "../../src/services/API";
import Layout from "../../src/components/shared/Layout/Layout";
import { useSelector } from "react-redux";
import ConsumerAndDonationTable from "../../src/components/shared/tables/ConsumerAndDonationTable";

function Donation() {
  const { user } = useSelector((state) => state.auth);
  const [data, setData] = useState([]);

  const getConsumerData = useCallback(async () => {
    try {
      const response = await API.post("/inventory/get-inventory-hospital", {
        filters: {
          inventoryType: "in",
          donar: user?._id,
        },
      });
      if (response.data?.success) {
        setData(response.data.inventory);
      }
    } catch (error) {
      console.error("Failed to fetch consumer data:", error);
    }
  }, [user?._id]);

  useEffect(() => {
    if (user?._id) {
      getConsumerData();
    }
  }, [user, getConsumerData]);

  return (
    <Layout>
      <ConsumerAndDonationTable data={data} heading={"Donation records"} />
    </Layout>
  );
}

export default Donation;
