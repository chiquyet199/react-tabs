import {get, post, put, del, opts, baseUrl, setToken, unsetToken} from "../api";

describe("API", () => {
  const successUrl = "/testUrl/1";
  const errorUrl = "/testUrl/error";
  const queryString = "?key1=value1";

  const fetchSpy = jest.spyOn(global, "fetch");

  describe("opts", () => {
    it("omits Authorization header before setToken called", () => {
      expect(Object.keys(opts().headers)).not.toEqual(
        expect.arrayContaining(["Authorization"]),
      );
    });

    it("includes Authorization header and correct token once setToken called", () => {
      const sampleToken = "abcdef123456";
      setToken(sampleToken);
      expect(opts().headers).toEqual(
        expect.objectContaining({Authorization: `Bearer ${sampleToken}`}),
      );
    });

    it("omits Authorization header and token after clearToken called", () => {
      const sampleToken = "abcdef123456";
      setToken(sampleToken);
      unsetToken();
      expect(Object.keys(opts().headers)).not.toEqual(
        expect.arrayContaining(["Authorization"]),
      );
    });
  });

  describe("GET", () => {
    it("should call fetch with correct argument", () => {
      fetchSpy.mockClear();

      return get(successUrl, {key1: "value1"}).then(() => {
        expect(fetchSpy).toBeCalledWith(
          `${baseUrl}${successUrl}${queryString}`,
          {
            ...opts(),
            method: "GET",
          },
        );
      });
    });

    it("should return body on success", () => {
      return get(successUrl, {key1: "value1"}).then(value => {
        expect(value).toEqual({value: "testGetValue"});
      });
    });

    it("should throw on error status code", () => {
      return get(errorUrl, {key1: "value1"})
        .then(() => {})
        .catch(err => {
          expect(err).toEqual({
            error: {value: "testGetError"},
            requestId: "12345678-abcd-1234-abcd-123456789012",
            status: 500,
            success: false,
          });
        });
    });
  });

  describe("POST", () => {
    it("should call fetch with correct argument", () => {
      fetchSpy.mockClear();

      return post(successUrl, {key1: "value1"}).then(() => {
        expect(fetchSpy).toBeCalledWith(`${baseUrl}${successUrl}`, {
          ...opts(),
          method: "POST",
          body: JSON.stringify({key1: "value1"}),
        });
      });
    });

    it("should return body on success", () => {
      return post(successUrl, {key1: "value1"}).then(value => {
        expect(value).toEqual({value: "testPostValue"});
      });
    });

    it("should throw on error status code", () => {
      return post(errorUrl, {key1: "value1"})
        .then(() => {})
        .catch(err => {
          expect(err).toEqual({
            error: {value: "testPostError"},
            requestId: "12345678-abcd-1234-abcd-123456789012",
            status: 404,
            success: false,
          });
        });
    });
  });

  describe("PUT", () => {
    it("should call fetch with correct argument", () => {
      fetchSpy.mockClear();

      return put(successUrl, {key1: "value1"}).then(() => {
        expect(fetchSpy).toBeCalledWith(`${baseUrl}${successUrl}`, {
          ...opts(),
          method: "PUT",
          body: JSON.stringify({key1: "value1"}),
        });
      });
    });

    it("should return body on success", () => {
      return put(successUrl, {key1: "value1"}).then(value => {
        expect(value).toEqual({value: "testPutValue"});
      });
    });

    it("should throw on error status code", () => {
      return put(errorUrl, {key1: "value1"})
        .then(() => {})
        .catch(err => {
          expect(err).toEqual({
            error: {value: "testPutError"},
            requestId: "12345678-abcd-1234-abcd-123456789012",
            status: 503,
            success: false,
          });
        });
    });
  });

  describe("DEL", () => {
    it("should call fetch with correct argument", () => {
      fetchSpy.mockClear();

      return del(successUrl, {key1: "value1"}).then(() => {
        expect(fetchSpy).toBeCalledWith(`${baseUrl}${successUrl}`, {
          ...opts(),
          method: "DELETE",
          body: JSON.stringify({key1: "value1"}),
        });
      });
    });

    it("should return body on success", () => {
      return del(successUrl).then(value => {
        expect(value).toEqual({value: "testDeleteValue"});
      });
    });

    it("should throw on error status code", () => {
      return del(errorUrl, {key1: "value1"})
        .then(() => {})
        .catch(err => {
          expect(err).toEqual({
            error: {value: "testDeleteError"},
            requestId: "12345678-abcd-1234-abcd-123456789012",
            status: 500,
            success: false,
          });
        });
    });
  });
});
