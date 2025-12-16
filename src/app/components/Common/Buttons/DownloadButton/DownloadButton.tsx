import { Button, Row, Select, Space } from "antd";
import { useEffect, useState } from "react";

export default function DownloadButton() {
  const [months, setMonths] = useState<string[]>([]);
  const [selected, setSelected] = useState("");

  useEffect(() => {
    fetch("/api/payments/backupList")
      .then(res => res.json())
      .then(setMonths);
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
          onChange={e => setSelected(e.target.value)} 
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
