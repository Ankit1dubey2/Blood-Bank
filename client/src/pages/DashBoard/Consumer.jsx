import React, { useEffect, useState, useCallback } from "react";
import API from "../../services/API";
import Layout from "../../components/shared/Layout/Layout";
import { useSelector } from "react-redux";
import ConsumerAndDonationTable from "../../components/shared/tables/ConsumerAndDonationTable";

function Consumer() {
  const { user } = useSelector((state) => state.auth);
  const [data, setData] = useState([]);

  const getConsumerData = useCallback(async () => {
    try {
      const response = await API.post("/inventory/get-inventory-hospital", {
        filters: {
          inventoryType: "out",
          hospital: user?._id,
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
      <ConsumerAndDonationTable data={data} heading={"Consumption records"} />
    </Layout>
  );
}

export default Consumer;
