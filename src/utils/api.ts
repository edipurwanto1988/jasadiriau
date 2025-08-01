import { NextRequest, NextResponse } from "next/server";
import * as exception from "./exception";
import { Prisma } from "@/generated/prisma";
import { ZodError } from "zod";
import { parseZodError } from "./format";

type HandlerFn = (
  req: NextRequest,
  ctx: { params?: any }
) => Promise<NextResponse>;

const api =
  (fn: HandlerFn): HandlerFn =>
  async (req, ctx) => {
    try {
      return await fn(req, ctx);
    } catch (error: any) {
      let message = "";
      if (error instanceof exception.UnauthorizedException) {
        return NextResponse.json(
          { message: error.message },
          { status: error.status }
        );
      }

      if (error instanceof exception.BadRequestException) {
        return NextResponse.json(
          { message: error.message },
          { status: error.status }
        );
      }

      if (error instanceof exception.NotFoundException) {
        return NextResponse.json(
          { message: error.message },
          { status: error.status }
        );
      }

      if (error instanceof exception.ValidationException) {
        return NextResponse.json(
          { message: error.message },
          { status: error.status }
        );
      }

      if (error instanceof ZodError) {
        return NextResponse.json(
          { message: "Validation error.", error: parseZodError(error) },
          { status: 422 }
        );
      }

      if (error instanceof Prisma.PrismaClientKnownRequestError) {
        switch (error.code) {
          case "P2000":
            message = "Nilai yang kamu masukkan terlalu panjang.";
            break;
          case "P2001":
            message = "Data yang dicari tidak ditemukan.";
            break;
          case "P2002":
            message = "Data sudah ada, tidak boleh duplikat.";
            break;
          case "P2003":
            message = "Data terkait tidak ditemukan (relasi gagal).";
            break;
          case "P2004":
            message = "Terjadi kesalahan aturan di database.";
            break;
          case "P2005":
            message = "Nilai yang dimasukkan tidak sesuai.";
            break;
          case "P2006":
            message = "Nilai yang diberikan tidak cocok dengan tipe data.";
            break;
          case "P2007":
            message = "Validasi data gagal.";
            break;
          case "P2008":
            message = "Query tidak bisa diproses.";
            break;
          case "P2009":
            message = "Query tidak valid.";
            break;
          case "P2010":
            message = "Gagal menjalankan query mentah.";
            break;
          case "P2011":
            message = "Kolom tidak boleh kosong.";
            break;
          case "P2012":
            message = "Ada data wajib yang belum diisi.";
            break;
          case "P2013":
            message = "Ada argumen yang belum dikirim.";
            break;
          case "P2014":
            message = "Hubungan data tidak valid.";
            break;
          case "P2015":
            message = "Data dengan ID tersebut tidak ditemukan.";
            break;
          case "P2016":
            message = "Query yang digunakan tidak valid.";
            break;
          case "P2017":
            message = "Kesalahan aturan di database.";
            break;
          case "P2018":
            message = "Relasi yang dibutuhkan tidak ditemukan.";
            break;
          case "P2019":
            message = "Data yang dikirim tidak sesuai.";
            break;
          case "P2025":
            message = "Data yang ingin dihapus atau diubah tidak ditemukan.";
            break;
          default:
            message =
              error.message || "Terjadi kesalahan yang tidak diketahui.";
            break;
        }

        return NextResponse.json(
          { message: message, error: { code: error.code, meta: error.meta } },
          { status: 400 }
        );
      }

      return NextResponse.json(
        {
          message: error?.message,
          error: error?.stack,
        },
        { status: 400 }
      );
    }
  };

export default api;
