<?php

namespace Classes;

class API
{
  private $url;
  private $limit;
  private $page;
  private $offset;
  private $query;
  // init class
  public function __construct($url, $limit = null, $page = null, $query = null)
  {
    $this->url = $url;
    $this->limit = $limit;
    $this->page = $page;
    $this->query = $query ? http_build_query($query) : null;
    $this->offset = ($page - 1) * $this->limit;
    $this->url = $this->buildUrl();
  }
  // build url by query params
  private function buildUrl()
  {
    $url = $this->url;
    $params = [];

    if ($this->query) {
      $params[] = $this->query;
    }

    if ($this->limit !== null) {
      $params[] = 'pageSize=' . $this->limit;
    }

    if ($this->page !== null) {
      $params[] = 'page=' . $this->page;
    }

    if ($this->offset !== null) {
      $params[] = 'offset=' . $this->offset;
    }

    if (!empty($params)) {
      $url .= '?' . implode('&', $params);
    }

    return $url;
  }
  // making request and returning info from request
  public function info($key = null)
  {
    $ch = curl_init();
    curl_setopt($ch, CURLOPT_URL, $this->url);
    curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
    curl_setopt($ch, CURLOPT_HTTPHEADER, [
      'Content-Type: application/json',
      'User-Agent: Sibers/1.0'
    ]);

    $response = curl_exec($ch);

    if (curl_errno($ch)) {
      $error = 'Error: ' . curl_error($ch);
      curl_close($ch);
      return json_encode(['error' => $error]);
    } else {
      $data = json_decode($response, true);
      $result = $key ? $data[$key] : $data;
      curl_close($ch);
      return json_encode($result);
    }
  }
}
