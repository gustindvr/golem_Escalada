import { getBackupList } from "@/utils/commons";
import { Button, Row, Select, Space } from "antd";
import { useEffect, useState } from "react";

export default function DownloadButton() {
  const [months, setMonths] = useState<string[]>([]);
  const [selected, setSelected] = useState("");

  useEffect(() => {
    try {
      const fetchBackupList = async () => {
        const response = await getBackupList();
        setMonths(response);
      };
      fetchBackupList();
    } catch (error) {
      console.error("Error fetching backup list:", error);
    }
  }, []);

  const download = () => {
    window.open(`/api/payments/backup/${selected}`, "_blank");
  }

  return (
    <Space>
      <Row>
        <Select
          size="middle"
          placeholder="Seleccione el Mes"
          onChange={e => setSelected(e)} 
          options={months.map(m => ({ label: m, value: m }))}
        />
      </Row>
      
      <Button 
        onClick={download} 
        disabled={!selected}
      >
        Descargar
      </Button>
    </Space>
  );
}
