<?php if ( ! defined('BASEPATH')) exit('No direct script access allowed');

class Users_model extends CI_Model {
	 
	function __construct() {
        parent::__construct();
        date_default_timezone_set('America/Mexico_City');
    }

    /**
     *  Funcion que dice si un ususario esta disponible i.e. si no esta repetido
     */
    public function isAvalibleUser($params) {
        extract($params);

        if (isset($user) AND strlen($user) > 0) {
            $this->db->select('idUser');
            $this->db->from('Users');
            $this->db->where('user', $user);

            $resultSelect = $this->db->get();
            if ($resultSelect->num_rows() > 0) {
                return false;
            }
            return true;
        }
    }

    /**
     * Crea un nuevo usuario en la base de datos 
     *
     * @method json createUser()
     */
    public function createUser($params) {
    	extract($params);

    	if (isset($name) AND strlen($name) > 0 AND (isset($password) AND strlen($password) > 0) AND (isset($user) AND strlen($user) > 0)) {
            if (isset($type) AND strlen($type) > 0) { 
                $data_users_insert = array(
                    'name'      => $name,
                    'password'  => $password,
                    'user'      => $user
                );

                $this->db->insert('Users', $data_users_insert);
                $resultInsert = $this->db->affected_rows();
                if ($resultInsert > 0) {
                    $idUser = $this->db->insert_id();

                    $this->db->select('idUserType');
                    $this->db->from('UsersType');
                    $this->db->where('description', $type);

                    $resultSelect = $this->db->get();
                    if ($resultSelect->num_rows() > 0) {
                        $result = $resultSelect->result();
                        
                        $idUserType = $result[0]->idUserType;

                        $dataRelationUsersInsert = array(
                            'idUser'        => $idUser,
                            'idUserType'    => $idUserType
                        );

                        $this->db->insert('Users_has_UsersType', $dataRelationUsersInsert);
                        $resultInsert = $this->db->affected_rows();
                        if ($resultInsert > 0) {
                            return true;
                        }
                    }// end if
                }// end if
                return false;
            }elseif (isset($id_type) AND $id_type > 0) {
                $data_users_insert = array(
                    'name'      => $name,
                    'password'  => $password,
                    'user'      => $user
                );

                $this->db->insert('Users', $data_users_insert);
                $resultInsert = $this->db->affected_rows();
                if ($resultInsert > 0) {
                    $idUser = $this->db->insert_id();

                    $dataRelationUsersInsert = array(
                        'idUser'        => $idUser,
                        'idUserType'    => $id_type
                    );

                    $this->db->insert('Users_has_UsersType', $dataRelationUsersInsert);
                    $resultInsert = $this->db->affected_rows();
                    if ($resultInsert > 0) {
                        return true;
                    }// end if
                }// end if
                return false;
            }else{
                // modificar al final por el usuario con el id correspondiente al campo default
                $data_users_insert = array(
                    'name'      => $name,
                    'password'  => $password,
                    'user'      => $user
                );

                $this->db->insert('Users', $data_users_insert);
                $resultInsert = $this->db->affected_rows();
                if ($resultInsert > 0) {
                    $idUser = $this->db->insert_id();

                    $dataRelationUsersInsert = array(
                        'idUser'        => $idUser,
                        'idUserType'    => 2
                    );

                    $this->db->insert('Users_has_UsersType', $dataRelationUsersInsert);
                    $resultInsert = $this->db->affected_rows();
                    if ($resultInsert > 0) {
                        return true;
                    }// end if
                }// end if
            }// end else
        }// end if
    }// end createUser()

    /**
     * 
     */
    public function createUserType($params) {
        extract($params);

        if (isset($description) AND strlen($description) > 0) {
            $dataInsert = array(
                'description'   => $description
            );
            $this->db->insert('UsersType', $dataInsert);

            $resultInsert = $this->db->affected_rows();
            if ($resultInsert > 0) {
                return true;
            }
            return false;
        }
    }// end createUserType()

    /**
     *  funcin que dice si un usuario ingreso los parametros de logueo de manera correcta
     *
     * @param json $params nUser, pass
     *
     * @return boolean true si los paparemtros son correctos, false si el password es incorrecto, -1 si el usuario es incorrecto, null si los parametros no son validos
     */
    public function isCorrectUser($params) {
        extract($params);

        if (isset($nUser) AND strlen($nUser) > 0 AND (isset($pass) AND strlen($pass) > 0)) {
            $dbP = $this->getPassByUser($nUser);
            if ($dbP[1]) {
                if ($dbP[0] == $pass) {
                    return true;
                }
                return false;
            }
            return -1;
        }
    }// end isCorrectUser()

    private function getPassByUser($nUser) {
        $this->db->select('password');
        $this->db->from('Users');
        $this->db->where('user', $nUser);
        $pass = array();
        $resultSelect = $this->db->get();
        if ($resultSelect->num_rows() > 0) {
            $result = $resultSelect->result();
            $pass[0] = $result[0]->password;
            $pass[1] = true;
            return $pass;
        }
        $pass[0] = '-1asfewexc fadafddsfa dfad faere af dfef d<f dfaf af dfaa12434 T &/&%&/$%/&';
        $pass[1] = false;
        return $pass;
    }// end getPassByUser()

    /** 
     * 
     */
    public function setFingetPrint($params) {
        extract($params);

        if (isset($fingerPrint) AND strlen($fingerPrint) AND (isset($idUser) AND $idUser > 0)) {
            $dataUpdate = array(
                'fingerPrint'   => $fingerPrint
            );
            $this->db->where('idUser', $idUser);
            $this->db->update('Users', $dataUpdate);

            $resultUpdate = $this->db->affected_rows();
            if ($resultUpdate > 0) {
                return true;
            }
            return false;
        }
    }// end setFingetPrint()

    public function setPhoneNumbre($params) {
        extract($addPhoneNumbreToUser);

        if (isset($number) AND strlen($number) > 0 AND (isset($idUser) AND $idUser > 0)) {
            $dataUpdate = array(
                'phoneNumber'   => $number
            );
            $this->db->where('idUser', $idUser);
            $this->db->update('Users', $dataUpdate);

            $resultUpdate = $this->db->affected_rows();
            if ($resultUpdate > 0) {
                return true;
            }
            return false;
        }
    }// end addPhoneNumbreToUser()

    public function setName($params) {
        extract($params);

        if (isset($idUser) AND $idUser > 0 AND (isset($name) AND strlen($name) > 0)) {
            $dataUpdate = array(
                'name'  => $name
            );
            $this->db->where('idUser', $idUser);
            $this->db->update('Users', $dataUpdate);

            $resultUpdate = $this->db->affected_rows();
            if ($resultUpdate > 0) {
                return true;
            }
            return false;
        }
    }

    /** 
     * 
     */
    public function changePassword($params) {
        extract($params);

        if (isset($idUser) AND $idUser > 0 AND (isset($oldPass) AND strlen($oldPass) > 0) AND (isset($nPass) AND strlen($nPass) > 0)) {
            if ($this->isCorrectPass($oldPass, $idUser)) {
                $dataUpdate = array(
                    'password'  => $nPass
                );
                $this->db->where('idUser', $idUser);
                $this->db->update('Users', $dataUpdate);

                $resultUpdate = $this->db->affected_rows();
                if ($resultUpdate > 0) {
                    return true;
                }
                return false;
            }
            return -1;
        }
    }// end changePassword()

    private function isCorrectPass($oldPass, $idUser) {
        $this->db->select('password');
        $this->db->from('Users');
        $this->db->where('idUser', $idUser);

        $pass = array();
        $resultSelect = $this->db->get();
        if ($resultSelect->num_rows() > 0) {
            $result = $resultSelect->result();

            $password = $result[0]->password;
            if ($oldPass == $password) {
                return true;
            }
            return false;
        }
    }// end isCorrectPass()



}// end class
?>