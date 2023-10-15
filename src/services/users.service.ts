import _core from "./index.service";

class _users extends _core {
    private baseUrl: string = this.getBaseUrl();

    async getUsers(cookie: string) {
        try {
            const response = await fetch(`${this.baseUrl}/api/users/account`, {
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${cookie}`,
                },
            });
            const data = await response.json();

            return data.data;
        } catch (error) {
            console.log(error);
            throw error;
        }
    }

    async updateStatusAccount(
        id: number,
        id_account: number,
        status: boolean,
        cookie: string
    ) {
        try {
            const res = await fetch(
                `${this.baseUrl}/api/users/account/verifikasi/${id}`,
                {
                    method: "PUT",
                    headers: {
                        "Content-Type": "application/json",
                        Authorization: `Bearer ${cookie}`,
                    },
                    body: JSON.stringify({
                        id: id_account,
                        status_account: status,
                    }),
                }
            );

            const data = await res.json();

            if (data.status === true) {
                window.location.reload();
            } else {
                alert(data.message);
            }
        } catch (error) {
            console.log(error);
            throw error;
        }
    }

    async getUmum(cookie: string) {
        try {
            const res = await fetch(`${this.baseUrl}/api/users/umum`, {
                headers: {
                    Authorization: `Bearer ${cookie}`,
                },
            });
            const data = await res.json();

            return data;
        } catch (error) {
            console.error(error);
            throw error;
        }
    }

    async getMahasiswa(cookie: string) {
        try {
            const res = await fetch(`${this.baseUrl}/api/users/mahasiswa`, {
                headers: {
                    Authorization: `Bearer ${cookie}`,
                },
            });
            const data = await res.json();

            return data;
        } catch (error) {
            console.error(error);
        }
    }

    async getDosen(cookie: string) {
        try {
            const res = await fetch(`${this.baseUrl}/api/users/dosen`, {
                headers: {
                    Authorization: `Bearer ${cookie}`,
                },
            });
            const data = await res.json();

            return data;
        } catch (error) {
            console.error(error);
        }
    }

    async deleteUsers(id: number, cookie: string) {
        try {
            const res = await fetch(
                `https://api.ricogann.com/api/users/umum/delete/${id}`,
                {
                    method: "DELETE",
                    headers: {
                        Authorization: `Bearer ${cookie}`,
                    },
                }
            );
            const data = await res.json();

            return data;
        } catch (error) {
            console.error(error);
        }
    }

    async deleteDosen(id: number, cookie: string) {
        try {
            const res = await fetch(
                `https://api.ricogann.com/api/users/dosen/delete/${id}`,
                {
                    method: "DELETE",
                    headers: {
                        Authorization: `Bearer ${cookie}`,
                    },
                }
            );
            const data = await res.json();

            return data;
        } catch (error) {
            console.error(error);
        }
    }

    async deleteMahasiswa(id: number, cookie: string) {
        try {
            const res = await fetch(
                `https://api.ricogann.com/api/users/mahasiswa/delete/${id}`,
                {
                    method: "DELETE",
                    headers: {
                        Authorization: `Bearer ${cookie}`,
                    },
                }
            );
            const data = await res.json();

            return data;
        } catch (error) {
            console.error(error);
        }
    }

    async getAccountById(id: number, cookie: string) {
        try {
            const res = await fetch(
                `https://api.ricogann.com/api/users/account/${id}`,
                {
                    headers: {
                        Authorization: `Bearer ${cookie}`,
                    },
                }
            );
            const data = await res.json();

            return data;
        } catch (error) {
            console.error(error);
        }
    }
}

export default _users;
