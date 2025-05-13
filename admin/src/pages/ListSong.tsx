import {
  AiOutlinePlusCircle,
  AiTwotoneDelete,
  AiFillEdit,
} from "react-icons/ai";
import { Link } from "react-router-dom";
import { QuestionCircleOutlined } from "@ant-design/icons";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { Button, Empty, notification, Popconfirm, Table } from "antd";

import instance from "../configs/instance"; // Assuming instance is the axios instance
import React from "react";
import { ColumnsType } from "antd/es/table";

const ListSong = () => {
  const [api, contextHolder] = notification.useNotification();
  const { data, isLoading, error } = useQuery({
    queryKey: ["song"],
    queryFn: () => instance.get("/song/list")
  });
console.log(data);

  const queryClient = useQueryClient();
  const { mutate } = useMutation({
    mutationFn: async (id: string) => {
      try {
        return await instance.delete(`/song/remove/${id}`);
      } catch (error) {
        throw new Error("error");
      }
    },
    onSuccess: () => {
      api.open({
        message: "Xóa bài hát thành công",
        description: "Bài hát đã được xóa thành công",
        type: "success",
      });
      queryClient.invalidateQueries({ queryKey: ["song"] });
    },
    onError: () =>
      api.open({
        message: "Xóa bài hát thất bại",
        description: "Không thể xóa bài hát này",
        type: "error",
      }),
  });


  const columns: ColumnsType<any> = [
    {
      title: "Ảnh",
      dataIndex: "image",
      key: "image",
      render: (image: string) => <img src={image} alt="song image" style={{ width: "100px", height: "auto" }} />,
    },
    {
      title: "Tên Bài Hát",
      dataIndex: "name",
      key: "name",
    },
    {
      title: "Album",
      dataIndex: "album",
      key: "album",
      render: (album: string) => album,
    },
    {
      title: "Duration",
      dataIndex: "duration",
      key: "duration",
    },
    {
      title: "Hành động",
      key: "operation",
      fixed: "right",
      render: (_: any, song: any) => {
        return (
          <div>
            <Link to={`/admin/song/${song._id}`}>
              <Button type="primary" className="mr-2">
                <AiFillEdit className="text-xl" />
              </Button>
            </Link>
            <Popconfirm
              onConfirm={() => mutate(song._id)}
              title="Xóa Bài Hát"
              description="Bạn có chắc chắn muốn xóa bài hát này không?"
              okText="Có"
              cancelText="Không"
              icon={<QuestionCircleOutlined style={{ color: "red" }} />}
            >
              <Button danger>
                <AiTwotoneDelete className="text-lg" />
              </Button>
            </Popconfirm>
          </div>
        );
      },
    },
  ];
  const dataSource = data?.data?.map((song: any) => ({
    key: song._id,
    ...song,
  }));

  if (isLoading) {
    return (
      <div>
        <Empty
          image={Empty.PRESENTED_IMAGE_SIMPLE}
          styles={{ image: { width: 100, height: 100 } }}
        />

      </div>
    );
  }

  if (error) {
    return <p>Không thể tải dữ liệu</p>;
  }

  return (
    <div>
      <div className="flex items-center justify-between mb-5">
        <h1>Quản lý Bài Hát</h1>
        <Link to="/admin/songadd">
          <Button type="primary">
            <AiOutlinePlusCircle />
            Thêm Bài Hát
          </Button>
        </Link>
      </div>
      {contextHolder}
      <Table columns={columns} dataSource={dataSource}  />
    </div>
  );
};

export default ListSong;
